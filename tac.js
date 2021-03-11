
const playerFactory = ({playerName,weapon,value}) => {
    let score = 0;
    return {playerName,weapon,score,value};
};



const GameBoard = (() =>{
    let playerOne = playerFactory({playerName:'Player X',weapon:'X',value:1});
    let playerTwo = playerFactory({playerName:'Player O',weapon:'O',value:-1});
    const gameBoardCells =[0,0,0,0,0,0,0,0,0];
    let initPlayer = true;
    let renderBoard = () =>{
        gameBoardCells.forEach((element,index) =>{
            let boardCell = document.createElement('div');
            boardCell.setAttribute('class','cols-md-4 border-5 text-center p-0 tic-cell border-end border-bottom');
            boardBody.appendChild(boardCell);
            boardCell.setAttribute('data-index',`${index}`)
            if( index === 2 || index === 5 ){
                boardCell.setAttribute('class','cols-md-4 border-5 text-center p-0 tic-cell border-bottom display-6');
                boardBody.appendChild(boardCell);
                boardCell.setAttribute('data-index',`${index}`)
            }
            else if (index === 6 || index === 7){   
                boardCell.setAttribute('class','cols-md-4 border-5 text-center p-0 tic-cell border-end display-6');
                boardBody.appendChild(boardCell);
                boardCell.setAttribute('data-index',`${index}`)
            }
            else if (index === 8 ){
                boardCell.setAttribute('class','cols-md-4 border-5 text-center p-0 tic-cell display-6');
                boardBody.appendChild(boardCell);
                boardCell.setAttribute('data-index',`${index}`)
            }
            
            boardCell.addEventListener('click',checkGame); 
        });   

    }

    function checkGame(event){
        let playerAction = writePlayerTic();
        index =  event.target.dataset.index;
        event.target.textContent =  playerAction.weapon;
        gameBoardCells.splice(index,1,playerAction.value);
        checkWinner(); 
    }

    function writePlayerTic(){
       if (initPlayer){
        switchPlayer();
        return playerOne;
       }

       if(!initPlayer){
        switchPlayer();
        return playerTwo;
       }
        
    }

    function switchPlayer(){
        initPlayer = !initPlayer;
    }

    function checkWinner(){
      let xWin = 3;
      let oWin = -3;
      const winCombination= {
          horione:gameBoardCells[0] + gameBoardCells[1] + gameBoardCells[2],
          horitwo:gameBoardCells[3] + gameBoardCells[4] + gameBoardCells[5],
          horithree:gameBoardCells[6] + gameBoardCells[7] + gameBoardCells[8],
          vertone:gameBoardCells[0] + gameBoardCells[3] + gameBoardCells[6],
          verttwo:gameBoardCells[1] + gameBoardCells[4] + gameBoardCells[7],
          vertthree:gameBoardCells[2] + gameBoardCells[5] + gameBoardCells[6],
          diagone:gameBoardCells[0] + gameBoardCells[4] + gameBoardCells[8],
          diagtwo:gameBoardCells[2] + gameBoardCells[4] + gameBoardCells[6]
      } 
      
    
    for (let key in winCombination){
    switch(true){
      case( winCombination[key] === xWin): 
      alert('X win')
      playerOne.score += 1;
      playerOneScore.textContent = playerOne.score;
     
      reset();
      break;
     
      case( winCombination[key] === oWin):
      playerTwo.score+=1;
      playerTwoScore.textContent = playerTwo.score; 
      alert('O win')
      
      reset();
      break;
     
        }
        }

    
    }

    function reset(){
     
    }

    return{renderBoard}
})();
let playerOneScore= document.querySelector('#player-score');
let playerTwoScore = document.querySelector('#computer-score')
let boardBody = document.querySelector('#game-board');
let drawBtn = document.querySelector('#draw-btn');
drawBtn.addEventListener('click',GameBoard.renderBoard);


