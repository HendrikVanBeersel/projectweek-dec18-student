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
    kleur =grid[position.y][position.x]
    let y=1;
    for(let i= position.x-1;i>=0;i--){
        if(x[i]===kleur){
            y++;
        }else{
            break;
        }
    }
    for(let i= position.x+1;i<x.length;i++){
        if(x[i]===kleur){
            y++;
        }else{
            break;
        }
    }
    return y;
}
function verticalChainAt(grid, position){
    let x = position.x
    let kleur =grid[position.y][position.x]
    let y=1;
    for(let i= position.y-1;i>=0;i--){
        if(grid[i][x]===kleur){
            y++;
        }else{
            break;
        }
    }
    for(let i= position.y+1;i<grid.length;i++){
        if(grid[i][x]===kleur){
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
    for(let i = 0; i<height(grid);i++){
        for(let j = 0; j<width(grid);j++){
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
    let blue=0;
    let red =0;
    let green =0;
    for (let i=0;i<xs.length;i++){
            kleur = grid[xs[i].y][xs[i].x];
            if (kleur ==="red"){
                red++
            }if (kleur ==="green"){
                green++
            }if (kleur ==="blue"){
                blue++
            }
            grid[xs[i].y][xs[i].x] = "";


        }
        if(red > 0){
            if(blue > 0){
                if(green > 0){
                    return {red: red, blue: blue,green: green};
                }
                return {red: red, blue: blue};
            }
            if(green >0){
                return {red: red,green: green};
            }
            return {red: red};
        }
        if(blue > 0){
            if(green > 0){
                return {blue: blue,green: green};
            }
            return {blue: blue};
        }
        if(green > 0){
            return {green: green};
        }
        return {};
        }
function collapse(grid){
    for (let i=0;i<height(grid);i++){
        for(let i=height(grid)-2; i>=0;i--){
            for(let j=0; j<width(grid);j++){
                if(grid[i+1][j] === ""){
                    swap (grid, {x:j, y:i+1}, {x: j, y: i} );
                }
            }
        }
    }
}
hendrik