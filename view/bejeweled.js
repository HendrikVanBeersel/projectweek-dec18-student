
function make2Darray(cols, rows){
    var arr = new Array(cols);
    for (var i = 0; i<arr.length; i++){
      arr[i] = new Array(rows);
    }
    return arr;
  
}
var bubbles = make2Darray(10, 10);

function randomKleur(){
    let get = Math.floor(Math.random()*6)+1;
    if (get === 1){
        return '#FF0000';
    } else if (get === 2){
        return '#0000FF';
    } else if (get == 3) {
        return '#FFFF00';
    } else if (get == 4){
        return '#FF00FF'
    } else if (get == 5){
        return '#FFFFFF'
    } else {
        return '#FFA500'
    }

}

function stringKleur(kleur){
 if (kleur == '#FF0000'){
     return "red";
 } else if (kleur == '#0000FF'){
     return "yellow";
 } else if (kleur == '#FFFF00'){
     return "blue";
 } else if (kleur == '#FF00FF' ){
     return "green"
 } else if (kleur == '#FFFFFF'){
     return "white"
 } else {
     return "orange"
 }
}

function setup(){
    createCanvas(300, 300);
    for (var i = 0; i<10; i++){
        for (var j = 0; j<10; j++){
            let kleur = randomKleur();
            let kleur2 =  stringKleur(kleur);
            bubbles[i][j] = {
                x: j,
                y: i,
                kleur: kleur2,
                display: function(){
                    fill(kleur); //inside of the object
                    stroke(0); //outline of the object
                    ellipse(this.x*30+15,this.y*30+15, 30, 30);
                }
            }
        }
    }
}

function draw(){
    background(0);
    for (var i = 0; i<10; i++){
        for (var j = 0; j<10; j++){
            bubbles[i][j].display();
        }
    }
}

