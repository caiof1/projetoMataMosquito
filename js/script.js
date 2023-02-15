// Atribuindo uma class que faz referencia ao player
class Player {
    constructor(pontos, color) {
        this.pontos = pontos
    }
}
// Adicionando informações no localstorage
let adicionarInformacoes = () => {
    if(localStorage.getItem('player') == null) {
        let player = new Player(0)
        localStorage.setItem('player', JSON.stringify(player))
    }
}
// Adicionando o nivel no localstorage para ser usado no jogo
function IniciarGame() {
    let select = document.getElementById('select')
    if(select.value != '') {
        localStorage.setItem('nivel', select.value)
        location.href = 'app.html'
    }

}

adicionarInformacoes()
