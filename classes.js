class Base {

    _life = 1
    maxLife = 1;
    defense = 0;
    attack = 0
   constructor(name){
      this.name = name
   }
   get life(){
       return this._life
   }
   set life(newLife){
       this._life = newLife < 0 ? 0 : newLife
   }
}

class Guerreiro extends Base{

   constructor(name){
       super(name)
       this.life = 100;
       this.maxLife = this.life;
       this.defense = Math.random() * 4;
       this.attack = Math.random() * 10;
       
   }
}

class Mago extends Base{
   constructor(name){
       super(name)
       this.life = 70;
       this.maxLife = this.life;
       this.defense = Math.random() * 2;
       this.attack = Math.random() * 10;
   }
}

//classes Monstros

class Monster extends Base{

   constructor(){
       super("Monster")
       this.life = 80;
       this.maxLife = this.life;
       this.defense = Math.random() * 3;
       this.attack = Math.random() * 10;
   }
}
class BigMonster extends Base{

   constructor(){
       super("Big Monster")
       this.life = 100;
       this.maxLife = this.life;
       this.defense = Math.random() * 5;
       this.attack = Math.random() * 10;
   }
}

//Cenário
//saber lutador 1 
//saber lutador 2 
//e o elementos de cada um 

class Cenario {

   constructor(lutador1, lutador2, lutador1El, lutador2El,log){
      
       this.lutador1 = lutador1;
       this.lutador2 = lutador2;
       this.lutador1El = lutador1El;
       this.lutador2El = lutador2El
       this.log = log
       this.isLutadorDead = false;
       this.isMonsterDead = false
   }
   start(){
        this.update();
       
        //attack do guerreiro
        setInterval( () =>{
           this.attackGuerreiro()
        }, 3500)

        //attack do monstro

        setInterval( () => {
            this.attackMonster()

        },4500)

   }
   attackGuerreiro(){
       if(this.lutador1.life > 0 && this.lutador2.life > 0 ){
           this.doAttack(this.lutador1, this.lutador2)
       }
       //mensagem de lutador morto
       if(this.lutador1.life <= 0  && !this.isLutadorDead){
           this.isLutadorDead = true
           this.log.addMessage(`${this.lutador1.name} está morto`)
       }
   }
   attackMonster(){
       if(this.lutador2.life > 0 && this.lutador1.life > 0 ){
           this.doAttack(this.lutador2, this.lutador1)
       }
       //mensagem de lutador morto
       if(this.lutador2.life <= 0  && !this.isMonsterDead){
           this.isMonsterDead = true
           this.log.addMessage(`${this.lutador2.name} está morto`)
       }
   }
   
   update(){
       //lutador 1
       //mostrar o nome
       this.lutador1El.querySelector(".name").innerHTML = `${this.lutador1.name} - ${this.lutador1.life.toFixed(1)} %`
       //calc vida
       let pct1 = (this.lutador1.life / this.lutador1.maxLife) * 100;
       //preencher a barra
       this.lutador1El.querySelector('.bar').style.width = `${pct1}%`

       

          //mudando a cor do nome 
       if(this.lutador1.life <= 30){
         
           this.lutador1El.querySelector('.name').style.color = 'red'
       }

       //lutador 2 
       //mostrar o nome
       this.lutador2El.querySelector(".name").innerHTML = `${this.lutador2.name} - ${this.lutador2.life.toFixed(1)}%`
        //calc vida
        let pct2 = (this.lutador2.life / this.lutador2.maxLife ) * 100
        //preencher a barra
        this.lutador2El.querySelector('.bar').style.width = `${pct2}%`
       

             //mudando a cor do nome 
       if(this.lutador2.life <= 30){
         
           this.lutador2El.querySelector('.name').style.color = 'red'
       }
   }
   doAttack(attacking, attacked){

       let attackFacktor = (Math.random() * 2 );
       let defenseFacktor = (Math.random() * 3);
       
       
         let actualAttack = attacking.attack * attackFacktor;
         let actualDefense = attacked.defense * defenseFacktor;

       if(actualAttack > actualDefense){

           attacked.life -= actualAttack

           this.log.addMessage(`${attacked.name} recebeu ${actualAttack.toFixed(2)} de dano de ${attacking.name}`)
       }
       else{
           this.log.addMessage(`${attacked.name} conseguiu defender o attaque de ${attacking.name}`) 
       }
       this.update()
   }
  

}
//classe Messagem

class Log {

   constructor(listEl){

       this.listEl = listEl
   }
   list = [];

   addMessage(msg){
       this.list.push(msg) 

       this.render()
   }
   render(){
       this.listEl.innerHTML = '' 
                                    
       for(let i in this.list){    

           this.listEl.innerHTML += `<li> ${this.list[i]} </li>`  
       }
   }
}