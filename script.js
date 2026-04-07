
window.addEventListener("DOMContentLoaded", function(){
const restartDiv = document.querySelector(".btns");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

// All 8 winning combinations for a 3x3 tic-tac-toe board
const winningCombos = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row

  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column

  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6]  // diagonal top-right to bottom-left
];

let board = ["","","","","","","","",""]
let playerIndex = 0;
let emptyCells = [];


for(let cell of cells){

     
            cell.addEventListener("mouseover", hoverEffect, false) // when we hover it gets background effect
    cell.addEventListener("mouseout", disableEffect, false) // when mouse is out then it gets rid of background effect
    cell.addEventListener("click", updateUI, false); // click event for placing X and O in the cells
     
     
}


function hoverEffect(e){
  let cell = e.target;

    if(cell.textContent === ""){

        cell.classList.add("hover")
    }
      
}
let timeOutId = 0;

function disableEffect(e){

    let cell = e.target;
    cell.classList.remove("hover")
}


function updateUI(e){
    let cellId = Number(e.target.id)
    if(e.target.textContent !== "") return;

    e.target.textContent = "X";
    board[cellId] = "X";
    localStorage.setItem("board", JSON.stringify(board))

    // Check if player already won BEFORE AI moves
    if (winner()) return;

    // Now allow AI
    timeOutId = setTimeout(aiMove, 200);
    aiwinsGame();
}



function aiMove(){

    emptyCells = [] // reset possibel empty cells every time we click;

    for(let cell of cells){

        if(cell.textContent === ""){
            emptyCells.push(cell);
        }
    }
   

     for(let [a,b,c] of winningCombos){
        
         if(cells[4].textContent === ""){
cells[4].textContent = "O";
      let cellId = Number(cells[4].id);
             board[cellId] = "O";
             localStorage.setItem("board", JSON.stringify(board))
winner(); 
break;

       
          
         }else if(cells[a].textContent === ""){

              cells[a].textContent = "O";
                let cellId = Number(cells[a].id);
                 board[cellId] = "O";
                 localStorage.setItem("board", JSON.stringify(board))
winner();  
break;

               
                
         }else if(cells[c].textContent === ""){
cells[c].textContent = "O";
 let cellId = Number(cells[c].id);
                 board[cellId] = "O";
                 localStorage.setItem("board", JSON.stringify(board))
winner();  
break;

                
                 
         }else{

             emptyCells[0].textContent = "O";
             
             let cellId = Number(emptyCells[0].id);
             board[cellId] = "O";
             localStorage.setItem("board", JSON.stringify(board))
winner();  
break;

            
         }

     }
}

function aiwinsGame(){

    for(let [a,b,c] of winningCombos){

         let values = [cells[a],cells[b],cells[c]];

         let aipossiblewin = values.filter(cell=> cell.textContent === "O");

         let empty = values.filter(cell=> cell.textContent === "");

        
             if(aipossiblewin.length === 2 && empty.length === 1){
    clearTimeout(timeOutId)
    cellId = Number(empty[0].id);
    cells[cellId].textContent = "O";
    board[cellId] = "O";
    localStorage.setItem("board", JSON.stringify(board))
    winner();  
    return;
}

          
            

         
    }
     stopWining(); // else after if loop is not ture then run stop winning function
}


function stopWining(){
    for(let [a,b,c] of winningCombos){
      
        let values = [cells[a],cells[b],cells[c]];

        let Xwining = values.filter(cell=> cell.textContent === "X");
        let empty = values.filter(cell=> cell.textContent === "");

  if(Xwining.length === 2 && empty.length === 1){
    clearTimeout(timeOutId)
    let cellId = Number(empty[0].id);
    cells[cellId].textContent = "O";
    board[cellId] = "O";
    localStorage.setItem("board", JSON.stringify(board))
    winner();  
    break;
}

        
    }
}


function winner(){

    for(let [a,b,c] of winningCombos){
        let values = [cells[a], cells[b], cells[c]];

        let Xwinner = values.every(cell=> cell.textContent === "X");
        let Owinner = values.every(cell=> cell.textContent === "O");

        if(Xwinner){
             cells[a].classList.add("winner")
             cells[b].classList.add("winner")
             cells[c].classList.add("winner")
             localStorage.setItem("board", JSON.stringify(board));
             clearTimeout(timeOutId)
             showResult("Congrats, You Won !!")
             removeHover();
             removeClicks();
             return true;  
        }

        if(Owinner){
             cells[a].classList.add("winner")
             cells[b].classList.add("winner")
             cells[c].classList.add("winner")
             localStorage.setItem("board", JSON.stringify(board));
             showResult("You lost, AI Won!!")
             removeHover();
                removeClicks();
             return true; 
        }
    }

    gameTie();
    return false; 
}



function removeHover(){

    for(let cell of cells){

        cell.removeEventListener("mouseover", hoverEffect)
    }
}

function gameTie(){
    let isTie = Array.from(cells).every(cell=> cell.textContent !== "");
    if(isTie){
  showResult("It is Tie! noboy wins :|")

    }
}

function removeClicks(){
 for(let cell of cells){

        cell.removeEventListener("click", updateUI)
    }

}


function showResult(winnerText){

    restartDiv.classList.add("show");
    message.textContent = winnerText;

    const restartBtn = document.querySelector(".btns > button");

    restartBtn.addEventListener("click", restart, false)
    
}


function restart(){

    localStorage.removeItem("board");
    cells.forEach(cell=> cell.textContent = "")
    board = ["","","","","","","","",""];
     cells.forEach(cell=> cell.classList.remove("winner"));
     restartDiv.classList.remove("show");
     reAsiignEvents();
}


function reAsiignEvents(){
    let savedBoard = JSON.parse(localStorage.getItem("board"));

    for (let cell of cells) {
        if (savedBoard === null) {
            cell.addEventListener("mouseover", hoverEffect, false);
            cell.addEventListener("mouseout", disableEffect, false);
            cell.addEventListener("click", updateUI, false);
        }
    }
}


function updateGame(){
    let savedBoard = JSON.parse(localStorage.getItem("board"));

    savedBoard.forEach((cell, index) => {
        cells[index].textContent = cell;
    });

    savedBoard.forEach((cell,index)=>{

         board[index] = cell;
    })

    localStorage.setItem("board", JSON.stringify(board))

    winner();
}



updateGame();

})


