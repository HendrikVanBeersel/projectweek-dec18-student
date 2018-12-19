
function make2Darray(cols, rows){
    var arr = new Array(cols);
    for (var i = 0; i<arr.length; i++){
      arr[i] = new Array(rows);
    }
    return arr;
  
}
var grid = make2Darray(10, 10);

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
     return 'red';
 } else if (kleur == '#0000FF'){
     return 'blue';
 } else if (kleur == '#FFFF00'){
     return 'yellow';
 } else if (kleur == '#FF00FF' ){
     return 'fuchsia'
 } else if (kleur == '#FFFFFF'){
     return 'white'
 } else {
     return 'orange'
 }
}

function codeKleur(kleurString){
    if (kleurString == 'red'){
        return '#FF0000';
    } else if (kleurString == 'blue'){
        return '#0000FF';
    } else if (kleurString == 'yellow'){
        return '#FFFF00';
    } else if (kleurString == 'fuchsia' ){
        return '#FF00FF';
    } else if (kleurString == 'white'){
        return '#FFFFFF';
    } else {
        return '#FFA500';
    }
}

function setup(){
    createCanvas(300, 300);
    for (var i = 0; i<10; i++){
        for (var j = 0; j<10; j++){
            let random_kleur = randomKleur();
            let kleur2 =  stringKleur(random_kleur);
            grid[i][j] = {
                x: j,
                y: i,
                kleur: kleur2,
                select: false,
                kleurcode: random_kleur,
                display: function(){
                    fill(this.kleurcode); //inside of the object
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
            grid[i][j].display();
           
        }
    }
}

function geef_selected(){
    for (var i = 0; i<10; i++){
        for (var j = 0; j<10; j++){
            if (grid[i][j].select == true){
                return grid[i][j];
            }
        }
    }
}

function geef_selectedKleur(){
    for (var i = 0; i<10; i++){
        for (var j = 0; j<10; j++){
            if (grid[i][j].selected == true){
                return grid[i][j].kleurcode;
            }
        }
    }
}

var eerste_geselecteerd = 0;
function mousePressed(){
    for (var i = 0; i<10; i++){
        for (var j = 0; j<10; j++){
            var d = dist(mouseX, mouseY, j*30+15, i*30+15)
            if (d<15 && eerste_geselecteerd == 0){
              grid[i][j].select = true;
              eerste_geselecteerd = 1;
            } else if (d<15){
                var geselecteerd = geef_selected()
                var kleur_element2 = grid[i][j].kleur;
                var kleurcode_element2 = grid[i][j].kleurcode;
                grid[i][j].kleur = geselecteerd.kleur;
                grid[i][j].kleurcode = geselecteerd.kleurcode;
                geselecteerd.kleurcode = kleurcode_element2;
                geselecteerd.kleur = kleur_element2;
                
                geef_selected().select = false;
                grid[i][j].select = false;
                eerste_geselecteerd = 0;
               
            
            }
        }
    }
   
}
