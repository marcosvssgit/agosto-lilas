const cardsFlip = document.querySelectorAll(".card");

cardsFlip.forEach(card => {
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


    // Força o navegador a registrar a posição inicial
    proximoCard.offsetWidth;


    // Remove qualquer estado anterior
    proximoCard.classList.remove(
        "ativo",
        "saindo-esquerda",
        "saindo-direita"
    );

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

        cardAtual.classList.remove(
            "saindo-esquerda",
            "saindo-direita"
        );

        cardAtual.style.visibility = "";
        cardAtual.style.opacity = "";
        cardAtual.style.transform = "";

        proximoCard.style.visibility = "";
        proximoCard.style.opacity = "";
        proximoCard.style.transform = "";

        animando = false;

    }, 400);
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

sliderContainer.addEventListener("touchstart", (e) => {
    toqueInicioX = e.changedTouches[0].screenX;
}, { passive: true });

sliderContainer.addEventListener("touchend", (e) => {
    toqueFimX = e.changedTouches[0].screenX;
    tratarSwipe();
}, { passive: true });

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

//SITE MARIA DA PENHA
const card2 = document.getElementById('maria-da-penha');

card2.addEventListener('click', function () {
    window.open('https://www.institutomariadapenha.org.br/quem-e-maria-da-penha.html', '_blank');
});

//VIDEO CICLO DA VIOLÊNCIA
const videoCard3 = document.getElementById('ciclo-da-violencia');

videoCard3.addEventListener('click', function () {
    window.open('https://www.youtube.com/watch?v=BNo3cy9uW_4', '_blank');
});

//VIDEO JORNAL DA CIDADE
const videoCard4 = document.getElementById('jornal-da-cidade');

videoCard4.addEventListener('click', function () {
    window.open('https://www.youtube.com/watch?v=c5mUGG_0A6E', '_blank');
});

//VIDEO SOBRE A LEI MARIA DA PENHA
const videoCard5 = document.getElementById('video-mp');

videoCard5.addEventListener('click', function () {
    window.open('https://www.youtube.com/watch?v=gOvY5MzY60E', '_blank');
});

//VIDEO VIOLÊNCIA DOMÉSTICA
const videoCard6 = document.getElementById('violencia-domestica');

videoCard6.addEventListener('click', function () {
    window.open('https://www.youtube.com/watch?v=9p9D1wY1yAU', '_blank');
});

//RELATÓRIO
const toReport = document.getElementById('card-report');

toReport.addEventListener('click', function () {
    window.open('./report/report.html', '_blank');
});