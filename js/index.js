const cardsFlip = document.querySelectorAll(".card");

cardsFlip.forEach((card) => {
card.addEventListener("click", () => {
card.classList.toggle("flipped");
  });
});

// SLIDESHOW

const sliderContainer = document.getElementById("slider-cards");
const cards = document.querySelectorAll(".card-content");

const btnAnterior = document.getElementById("btn-anterior");
const btnProximo = document.getElementById("btn-proximo");

let indiceAtual = 0;
let animando = false;

cards[0].classList.add("ativo");

function trocarCard(novoIndice, direcao) {
// Impede outro clique durante a animação
if (animando) return;
animando = true;

const cardAtual = cards[indiceAtual];
const proximoCard = cards[novoIndice];

// Prepara o próximo card
if (direcao === "direita") {
proximoCard.style.transform = "translateX(100%)";
  } else {
proximoCard.style.transform = "translateX(-100%)";
  }

proximoCard.style.visibility = "visible";
proximoCard.style.opacity = "0";

// Remove qualquer estado anterior
proximoCard.classList.remove("ativo", "saindo-esquerda", "saindo-direita");

// Força o navegador a registrar a posição inicial
proximoCard.offsetWidth;

// Limpa os estilos inline para que as classes do CSS assumam e a transição aconteça
// (estilo inline tem prioridade sobre a classe .ativo e travava o card fora da tela)
proximoCard.style.visibility = "";
proximoCard.style.opacity = "";
proximoCard.style.transform = "";

cardAtual.classList.remove("ativo");

// Define para onde o atual vai
if (direcao === "direita") {
cardAtual.classList.add("saindo-esquerda");
  } else {
cardAtual.classList.add("saindo-direita");
  }

// Próximo entra
proximoCard.classList.add("ativo");

indiceAtual = novoIndice;

// Espera a transição terminar
setTimeout(() => {
cardAtual.classList.remove("saindo-esquerda", "saindo-direita");

// Para só o vídeo do card que saiu, depois que ele já está escondido
pausarVideo(cardAtual);

animando = false;
  }, 400);
}

function pausarVideo(card) {
const iframe = card.querySelector("iframe");
if (!iframe) return;
// Redefinir o src força o player do YouTube a descarregar e parar o áudio/vídeo
  iframe.src = iframe.src;
}

// BOTÕES (PRÓXIMO / ANTERIOR)
btnProximo.addEventListener("click", () => {
let novoIndice = indiceAtual + 1;
if (novoIndice >= cards.length) novoIndice = 0;
trocarCard(novoIndice, "direita");
});

btnAnterior.addEventListener("click", () => {
let novoIndice = indiceAtual - 1;
if (novoIndice < 0) novoIndice = cards.length - 1;
trocarCard(novoIndice, "esquerda");
});

// CONTROLE POR TOQUE (SWIPE) NO CELULAR
let toqueInicioX = 0;
let toqueFimX = 0;

sliderContainer.addEventListener(
"touchstart",
  (e) => {
    toqueInicioX = e.changedTouches[0].screenX;
  },
  { passive: true },
);

sliderContainer.addEventListener(
"touchend",
  (e) => {
    toqueFimX = e.changedTouches[0].screenX;
tratarSwipe();
  },
  { passive: true },
);

function tratarSwipe() {
const distanciaMinima = 50;

// Arrastou para a esquerda (Avançar)
if (toqueInicioX - toqueFimX > distanciaMinima) {
let novoIndice = indiceAtual + 1;
if (novoIndice >= cards.length) novoIndice = 0;
trocarCard(novoIndice, "direita");
  }

// Arrastou para a direita (Voltar)
if (toqueFimX - toqueInicioX > distanciaMinima) {
let novoIndice = indiceAtual - 1;
if (novoIndice < 0) novoIndice = cards.length - 1;
trocarCard(novoIndice, "esquerda");
  }
}

const cardPesquisa = document.getElementById("card-pesquisa");

if (cardPesquisa) {
  cardPesquisa.addEventListener("click", () => {
    window.location.href = "./report/report.html";
  });
}
