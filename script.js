
let nome = prompt('Digite Seu Nome')


if(nome != '' && nome != null){
let log = new Log(document.querySelector('#log')); //colocar o item log
let lutador = new Guerreiro(nome)
let monster = new BigMonster()



const Stage = new Cenario(

    lutador, 
    monster,

    document.querySelector('#char'),
    document.querySelector('#monster'),
    log

);

Stage.start();
}