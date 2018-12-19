//model
function width(grid){
    return grid[0].length;
}
function height(grid){
    return grid.length;
}
function isInside (grid, position){
    if (position.x<width(grid)&&position.x>=0){
        if(position.y<height(grid)&&position.y>=0){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
function swap (grid, p, q){
    let x = grid[p.y][p.x];
    grid[p.y][p.x] = grid[q.y][q.x];
    grid[q.y][q.x] = x;
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
        }
        return grid;
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
    return grid;
}    
//view
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
    } else if (get === 3) {
        return '#FFFF00';
    } else if (get === 4){
        return '#00FF00';
    } else if (get === 5){
        return '#FFFFFF';
    } else {
        return '#FFA500';
    }

}

function stringKleur(kleur){
    if (kleur == '#FF0000'){
        return "red";
    } else if (kleur === '#0000FF'){
        return "blue";
    } else if (kleur === '#FFFF00'){
        return "yellow";
    } else if (kleur === '#00FF00'){
        return "green";
    } else if (kleur === '#FFFFFF'){
        return "white";
    } else if (kleur === '#FFA500'){
        return "orange";
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
// UI
function setup(){
    createCanvas(300, 300);
    for (var i = 0; i<10; i++){
        for (var j = 0; j<10; j++){
            let kleur = randomKleur();
            let kleur2 =  stringKleur(kleur);
            grid[i][j] = {
                x: j,
                y: i,
                kleur: kleur2,
                display: function(){
                    fill(kleur); //inside of the object
                    stroke(0); //outline of the object
                    ellipse(this.x*30+15,this.y*30+15, 30, 30);
                }
            }
            console.log(grid);
        }
    }
    grid = removeChains(grid);
    grid = collapse(grid);
    console.log(grid) ;

}
    
