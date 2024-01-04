const  gameStatus = document.querySelector(".game-status");
const gameBoard = document.querySelector(".game-board");
const row1 = document.getElementsByClassName("row1");
const row2 = document.getElementsByClassName("row2");
const row3 = document.getElementsByClassName("row3");
const newGame = document.querySelector(".new-game");

const matrix = [row1, row2, row3];

let currentPlayer = "X";
gameStatus.innerText = "Current Player - " + currentPlayer;

let countX = 0;
let countO = 0;

function mousedOver(){
    this.style.cursor = "pointer";
}

function addEventListenersToCells(){
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            matrix[i][j].addEventListener("mouseover", mousedOver);
    
            matrix[i][j].addEventListener("mouseout", function(){
                this.style.cursor = "auto";
            });

            matrix[i][j].addEventListener("click", clickHandler);
        }
    }
}

addEventListenersToCells();

function endTheGame(winner, coordinates){
    gameStatus.innerText = "Winner Player - " + winner;

    for(let i = 0; i < coordinates.length; i++){
        coordinates[i].style.backgroundColor = "green";
    }

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            matrix[i][j].removeEventListener("mouseover", mousedOver);
            matrix[i][j].removeEventListener("click", clickHandler);
        }
    }
    newGame.classList.add("active");
}

function gameTied(){
    gameStatus.innerText = "Game Tied!";
    newGame.classList.add("active");
}

function checkWin(){
    if(countX + countO === 9){
        gameTied();
        return;
    }
    if(countX < 3 && countO < 3){
        return;
    }

    let coordinates;
    let x;
    let o;
    for(let i = 0; i < 3; i++){
        coordinates = [];
        x = 0;
        o = 0;
        for(let j = 0; j < 3; j++){
            if(matrix[i][j].innerText === "X"){
                x++;
                coordinates.push(matrix[i][j]);
            }
            else if(matrix[i][j].innerText === "O"){
                o++;
                coordinates.push(matrix[i][j]);
            }
        }
        if(x === 3 || o === 3){
            if(x === 3){
                endTheGame("X", coordinates);
                return;
            }
            endTheGame("O", coordinates);
            return;
        }
    }

    for(let j = 0; j < 3; j++){
        coordinates = [];
        x = 0;
        o = 0;
        for(let i = 0; i < 3; i++){
            if(matrix[i][j].innerText === "X"){
                x++;
                coordinates.push(matrix[i][j]);
            }
            else if(matrix[i][j].innerText === "O"){
                o++;
                coordinates.push(matrix[i][j]);
            }
        }
        if(x === 3 || o === 3){
            if(x === 3){
                endTheGame("X", coordinates);
                return;
            }
            endTheGame("O", coordinates);
            return;
        }
    }

    while(true){
        coordinates = [];
        x = 0;
        o = 0;
        for(let i = 0; i < 3; i++){
            if(matrix[i][i].innerText === "X"){
                x++;
                coordinates.push(matrix[i][i]);
            }
            else if(matrix[i][i].innerText === "O"){
                o++;
                coordinates.push(matrix[i][i]);
            }
        }
        if(x === 3 || o === 3){
            if(x === 3){
                endTheGame("X", coordinates);
                return;
            }
            endTheGame("O", coordinates);
            return;
        }
        break;
    }
    coordinates = [];
    x = 0;
    o = 0;
    let i = 0;
    let j = 2;
    for(let k = 0; k < 3; k++){
        if(matrix[i][j].innerText === "X"){
            x++;
            coordinates.push(matrix[i][j]);
        }
        else if(matrix[i][j].innerText === "O"){
            o++;
            coordinates.push(matrix[i][j]);
        }
        i++;
        j--;
    }
    if(x === 3 || o === 3){
        if(x === 3){
            endTheGame("X", coordinates);
            return;
        }
        endTheGame("O", coordinates);
        return;
    }
}

function changePlayer(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
        countX++;
    }
    else{
        currentPlayer = "X";
        countO++;
    }
    gameStatus.innerText = "Current Player - " + currentPlayer;
}

function clickHandler(){
    this.innerText = currentPlayer;
    changePlayer();
    this.style.cursor = "auto";
    this.removeEventListener("mouseover", mousedOver);
    this.removeEventListener("click", clickHandler);
    checkWin();
}

newGame.addEventListener("click", function(){
    currentPlayer = "X";
    gameStatus.innerText = "Current Player - " + currentPlayer;

    countX = 0;
    countO = 0;

    addEventListenersToCells();

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            matrix[i][j].innerText = "";
            matrix[i][j].style.backgroundColor = "transparent";
        }
    }

    newGame.classList.remove("active");
});
