let pegarSearch = () => {
    let end = location.search
    end = end.replace('?', '')
    return end
}

let verificarVitoriaOuDerrota = () => {
    let res = pegarSearch()
    let img = document.getElementById('img')
    if(res == 'ganhou') {
        img.src = '../img/vitoria.png'
    } else {
        img.src = '../img/game_over.png'
    }
}

verificarVitoriaOuDerrota()