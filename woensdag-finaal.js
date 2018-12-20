
function make2Darray(cols, rows){
    var arr = new Array(cols);
    for (var i = 0; i<arr.length; i++){
      arr[i] = new Array(rows);
    }
    return arr;
  
}
var grid = make2Darray(10, 10);

function randomKleur(){
    let get = Math.floor(Math.random()*7)+1;
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
    } else  if (get == 6){
        return '#FFA500'
    } else {
        return '#00FF00'
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
     return 'fuchsia';
 } else if (kleur == '#FFFFFF'){
     return 'white';
 } else if (kleur == '#FFA500'){
     return 'orange';
 } else {
     return 'green';
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
    } else if (kleurString == 'orange') {
        return '#FFA500';
    } else {
        return '#00FF00';
    }
}

function setup(){
    createCanvas(300, 300);
    for (var i = 0; i<10; i++){
        for (var j = 0; j<10; j++){
            let random_kleur = randomKleur();
            let kleur2 =  stringKleur(random_kleur);
            let rand = 0
            grid[i][j] = {
                x: j,
                y: i,
                kleur: kleur2,
                select: false,
                kleurcode: random_kleur,
                outline: rand,
                display: function(){
                    fill(this.kleurcode); //inside of the object
                    stroke(this.outline); //outline of the object
                    ellipse(this.x*30+15,this.y*30+15, 30, 30);
                }
            }
        }
    }

    for (let i = 0; i!=3; i++){
    removeChains(grid);
    collapse(grid);
    vulKleur(grid);
    }
} 


function draw(){
    background(0);
    for (var i = 0; i<10; i++){
        for (var j = 0; j<10; j++){
            grid[i][j].x = j;
            grid[i][j].y = i;
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

function buur_cirkel(x1, x2, y1, y2){
    return ((x1==x2+1 && y1 == y2) || (x1==x2-1 && y1==y2) ||(x1==x2 && y1 == y2+1) || (x1 == x2 && y1 == y2-1));
}

var eerste_geselecteerd = 0;
function mousePressed(){
    for (var i = 0; i<10; i++){
        for (var j = 0; j<10; j++){
            var d = dist(mouseX, mouseY, j*30+15, i*30+15)
            if (d<15 && eerste_geselecteerd == 0){
              grid[i][j].select = true;
              grid[i][j].outline = 255;
              eerste_geselecteerd = 1;
            } else if (d<15 && buur_cirkel(geef_selected().x, j, geef_selected().y, i)){
                var geselecteerd = geef_selected()
                var kleur_element2 = grid[i][j].kleur;
                var kleurcode_element2 = grid[i][j].kleurcode;
                grid[i][j].kleur = geselecteerd.kleur;
                grid[i][j].kleurcode = geselecteerd.kleurcode;
                geselecteerd.kleurcode = kleurcode_element2;
                geselecteerd.kleur = kleur_element2;
                grid[i][j].outline = 0;
                geselecteerd.outline = 0;
                
                if (!deel_van_drie(grid, j, i) && !deel_van_drie(grid, geef_selected().x, geef_selected().y)){
                    var geselecteerd2 = geef_selected()
                    var kleur_element3 = grid[i][j].kleur;
                    var kleurcode_element3 = grid[i][j].kleurcode;
                    grid[i][j].kleur = geselecteerd2.kleur;
                    grid[i][j].kleurcode = geselecteerd2.kleurcode;
                    geselecteerd2.kleurcode = kleurcode_element3;
                    geselecteerd2.kleur = kleur_element3;
                    geselecteerd2.outline = 0;
                    grid[i][j].outline = 0;
                }

                geef_selected().select = false;
                grid[i][j].select = false;
                eerste_geselecteerd = 0;

                
            
            } else if (d<15 && !buur_cirkel(geef_selected().x, j, geef_selected().y, i)){
                eerste_geselecteerd = 0;
                geef_selected().select = false;
                grid[i][j].select = false;
            }
        }
    }
    for (let i=0; i!=7; i++){
    removeChains(grid);
    collapse(grid);
    vulKleur(grid);
    }
   
}

function deel_van_drie(grid, x, y){
   return (( grid[y][x+1].kleur == grid[y][x].kleur && grid[y][x+2].kleur == grid[y][x].kleur)|| 
    (grid[y][x-1].kleur == grid[y][x].kleur && grid[y][x-2].kleur == grid[y][x].kleur)||
    (grid[y][x-1].kleur == grid[y][x].kleur && grid[y][x+1].kleur == grid[y][x].kleur)||
    (grid[y+1][x].kleur == grid[y][x].kleur && grid[y+2][x].kleur == grid[y][x].kleur)||
    (grid[y-1][x].kleur == grid[y][x].kleur && grid[y-2][x].kleur == grid[y][x].kleur)||
    (grid[y-1][x].kleur == grid[y][x].kleur && grid[y+1][x].kleur == grid[y][x].kleur));

}

function horizontalChainAt (grid, position){
    let x =[];
    let kleur = "  ";
    x =grid[position.y];
    kleur = grid[position.y][position.x].kleur;
    let y=1;
    for(let i= position.x-1;i>=0;i--){
        if(x[i].kleur===kleur){
            y++;
        }else{
            break;
        }
    }
    for(let i= position.x+1;i<x.length;i++){
        if(x[i].kleur===kleur){
            y++;
        }else{
            break;
        }
    }
    return y;
}
function verticalChainAt(grid, position){
    let x = position.x
    let kleur =grid[position.y][position.x].kleur
    let y=1;
    for(let i= position.y-1;i>=0;i--){
        if(grid[i][x].kleur===kleur){
            y++;
        }else{
            break;
        }
    }
    for(let i= position.y+1;i<grid.length;i++){
        if(grid[i][x].kleur===kleur){
            y++;
        }else{
            break;
        }
    }
    return y;
}

function removeChains(grid){
    let x =0;
    let xs = [];
    for(let i = 0; i<10;i++){
        for(let j = 0; j<10;j++){
        x = horizontalChainAt(grid, {x: j, y: i});
        if (x>=3){
            xs = [...xs, {x:j,y:i}];
        }else{
            x = verticalChainAt(grid,{x:j,y:i})
                if(x>=3){
                    xs = [...xs, {x:j,y:i}];
                }
            }
        }
    }
    for (let i=0;i<xs.length;i++){
            grid[xs[i].y][xs[i].x].kleur = "black";
            grid[xs[i].y][xs[i].x].kleurcode = '#000000'
    }
       
}


function swap (grid, p, q){
        let x = grid[p.y][p.x];
        grid[p.y][p.x] = grid[q.y][q.x];
        grid[q.y][q.x] = x;
}
    
function collapse(grid){
    for (let i=0;i<10;i++){
        for(let i=8; i>=0;i--){
            for(let j=0; j<10;j++){
                if(grid[i+1][j].kleur === "black"){
                    swap (grid, {x:j, y:i+1}, {x: j, y: i} );
                }
            }
        }
    }

        
}  

function vulKleur(grid){
    for (let i = 0; i!= 10; i++){
        for (let j = 0; j!= 10; j++){
            if (grid[i][j].kleur == "black"){
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
    
}