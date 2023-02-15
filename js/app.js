let fetchLocalStorage = () => {
    let player = JSON.parse(localStorage.getItem('player'))
    return player
}
// Atribuindo as dimensões da tela
let wid = innerWidth
let hei = innerHeight
let timeMosquito
let life = 4
let time = 15
let points = fetchLocalStorage().pontos
let dificuldade = localStorage.getItem('nivel')

// Definir o nivel do jogo
let definirDificuldade = () => {
    if(dificuldade == 1) {
        timeMosquito = 1500
    } else if(dificuldade == 2) {
        timeMosquito = 1200
    } else {
        timeMosquito = 900
    }
}
definirDificuldade()

// Escolher a cor do mosquito
let escolherCor = () => {
    if(Math.random() <= 0.50) {
        return ''
    } else {
        return 'invert(100%)'
    }
}

// Verificando mudanças na resolução da tela
function ChangeResolution() {
    wid = innerWidth
    hei = innerHeight
}
// Mostrando os pontos
let aumentarPoints = () => {
    document.getElementById('qtd__points').innerHTML = points
}
aumentarPoints()

// Escolhendo aleatoriamente o tamanho do mosquito
let chooseTamanhoMosquito = () => {
    let tamanhoMosquito
    if(Math.random() <= 0.50) {
        tamanhoMosquito = '1'
    } else {
        tamanhoMosquito = '2'
    }
    return tamanhoMosquito
}
// Adicionar corações
let addHeart = () => {
    let heart = document.getElementById('heart')
    for(let i = 1; i <= life; i++) {
        let img = document.createElement('img')
        heart.appendChild(img)
        img.src = '../img/coracao_cheio.png'
        img.id = i
    }
}
// Remover vida do player ao sumir um mosquito
let removeHeart = () => {
    document.getElementById(life).src = '../img/coracao_vazio.png'
    life--
    // Quando o life do player chegar a zero, ele perde
    if(life <= 0) {
        location.href = 'end.html?perdeu'
    }
}
// Função para mostrar o tempo quando iniciar o jogo
let addTime = () => {
    document.getElementById('span__time').innerHTML = time
}
addTime()

// Contagem do tempo
setInterval(() => {
    if(time <= 0) {
        let player = fetchLocalStorage()
        player.pontos = points
        localStorage.setItem('player', JSON.stringify(player))
        location.href = 'end.html?ganhou'
    }
    let spanTime = document.getElementById('span__time')
    spanTime.innerHTML = time
    time--
}, 1000);

addHeart()

// function para adicionar mosquito periodicamente
setInterval(() => {
    // Criando o mosquito e adicionando ele ao escopo html
    console.log(timeMosquito)
    let img = document.createElement('img')
    document.body.appendChild(img)
    img.src = '../img/mosquito.png'
    img.classList = `mosquito${chooseTamanhoMosquito()} mosquito`

    // Escolher aleatoriamente uma posição da tela para spawnar o mosquito
    let widAleatorio = Math.floor(Math.random() * wid - 100)
    let heiAleatorio = Math.floor(Math.random() * hei - 100)

    // Corrigindo posições do mosquito
    widAleatorio = widAleatorio < 0? 0:widAleatorio
    heiAleatorio = heiAleatorio < 0? 0:heiAleatorio
    widAleatorio = widAleatorio > wid? wid:widAleatorio
    heiAleatorio = heiAleatorio > hei? hei:heiAleatorio

    // Atribuindo as posições aleatorias aos mosquitos
    img.style.top = heiAleatorio + 'px'
    img.style.left = widAleatorio + 'px'

    //Atribuindo a cor do mosquito
    img.style.filter = escolherCor()

    // Atribuindo a scale dependendo da posição
    if(widAleatorio <= wid/2) {
        img.style.transform = 'scaleX(-1)'
    }

    // Event de click para eliminar o mosquito ao clicar nele
    img.onclick = () => {
        // Parando o time que remove automaticamente o mosquito
        clearTimeout(eliminarMosquitoTime)
        // Eliminando o mosquito logo depois do click sobre ele
        img.remove()
        // Aumentar pontos ao matar um mosquito
        points++
        aumentarPoints()
    }

    // Eliminando o mosquito depois de um certo tempo
    let eliminarMosquitoTime = setTimeout(() => {
        img.remove()
        removeHeart()
    }, timeMosquito)
}, timeMosquito)
