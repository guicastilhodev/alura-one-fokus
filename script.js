const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseBt = document.querySelector('#start-pause');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtImg = document.querySelector('.app__card-primary-button-icon');
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

let tempoDecorrridoEmSegundos = 1500;
let intervaloID = null;


musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorrridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorrridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorrridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto (contexto) {
    mostrarTempo();
    botoes.forEach((contexto)=>{
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        
        case "descanso-curto": 
            titulo.innerHTML = `Que tal dar uma respirada?,<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;

        case "descanso-longo": 
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;

    }
}

const contagemRegressiva = () => {
    if (tempoDecorrridoEmSegundos <= 0) {
        audioTempoFinalizado.play();
        zerarTemporizador();
        return;
    }
    tempoDecorrridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausarTemporizador);

function iniciarOuPausarTemporizador() {
    if (intervaloID) {
        audioPausa.play();
        zerarTemporizador();
        return;
    }
    audioPlay.play();
    intervaloID = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar";
    iniciarOuPausarBtImg.setAttribute('src', "/imagens/pause.png")
}

function zerarTemporizador() {
    clearInterval(intervaloID);
    iniciarOuPausarBt.textContent = "Começar";
    iniciarOuPausarBtImg.setAttribute('src', "/imagens/play_arrow.png")
    intervaloID = null;
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorrridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();