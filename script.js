const cards = document.querySelectorAll("div.card")
console.log(cards);
const turnIndicator = document.querySelector(".plr-num")
const p1ScoreIndicator = document.querySelector(".plr1-score")
const p2ScoreIndicator = document.querySelector(".plr2-score")

const winIndicator = document.querySelector('.win-condition')
const resetButton = document.querySelector('.reset')

const gameBoard = (function(){
    let board = [['.','.','.'],['.','.','.'],['.','.','.']];
    const placeX = (x,y)=>{
        if (board[y][x] != '.') return false;
        board[y][x] = 'x';
        return true;
    }
    const placeO = (x,y)=>{
        if (board[y][x] != '.') return false;
        board[y][x] = 'o';
        return true;
    }
    const wipe = ()=>{
        board = [['.','.','.'],['.','.','.'],['.','.','.']];
    }

    const checkWin = ()=>{
        for (var y=0; y<3; y++){
            const rowWin = (board[y][0] == board[y][1] 
                            && board[y][1] == board[y][2] 
                            && board[y][0] != '.')
            if (rowWin){
                return board[y][0]
            }
        }
        for (var x=0; x<3; x++){
            const columnWin = (board[0][x] == board[1][x] 
                            && board[1][x] == board[2][x] 
                            && board[0][x] != '.')
            if (columnWin){
                return board[0][x]
            }
        }
        if (board[0][0] ==  board[1][1] 
            && board[1][1] == board[2][2]
            && board[0][0] != '.'
        ){
            return board[0][0]
        }
        if (board[0][2] == board[1][1] 
            && board[1][1] == board[2][0]
            && board[0][2] != '.'
        ){
            return board[2][0]
        }
        return false;
    };

    const visualize = (turn, p1Score, p2Score)=>{
        for (let y=0; y<3; y++){
            for (let x=0; x<3; x++){
                const card = cards.item(y*3+x);
                card.textContent = board[y][x] == '.' ? '' : board[y][x];
                turnIndicator.textContent = (turn==1) ? ' X' : ' O';
                p1ScoreIndicator.textContent = p1Score
                p2ScoreIndicator.textContent = p2Score
            }
        }
    }

    const endGame = (winner) => {
        if (winner == 1){
            winIndicator.textContent = 'Player X wins!'
        }else if (winner == 2){
            winIndicator.textContent = 'Player O wins!'
        }else if (winner == -1){
            winIndicator.textContent = 'Tie!'
        }
        resetButton.style.display = 'block';
    }

    return {placeX, placeO, wipe, checkWin, visualize, endGame}
})();

const gameHandler = (function(){
    let tick = 0;
    let p1score = 0;
    let p2score = 0;
    let gameActive = true;
    const markTile = (num)=>{
        if (!gameActive) return false;
        const row = Math.floor((num-1)/3);
        const column = (num-1)%3;
        if (tick%2 == 0){
            if (!gameBoard.placeX(column, row)) return false;
        } else {
            if (!gameBoard.placeO(column, row)) return false;
        }   
        if(gameBoard.checkWin() != false){
            if (gameBoard.checkWin() == 'o'){
                p2score++;  
                gameBoard.endGame(2);
                gameActive = false;
            } else if (gameBoard.checkWin() == 'x'){
                p1score++;
                gameBoard.endGame(1);
                gameActive = false;
            }
            gameBoard.visualize(tick%2, p1score, p2score);
        };
        if(tick >= 8){
            gameBoard.visualize(tick%2, p1score, p2score);
            gameBoard.endGame(-1);
            gameActive = false;
        }
        tick++;
        gameBoard.visualize(tick%2+1, p1score, p2score);
    }
    const reset = ()=>{
        gameBoard.wipe()
        tick = 0;
        gameActive = true;
        gameBoard.visualize(tick%2+1, p1score, p2score);
    }
    return {markTile, reset}
})();

cards.forEach(node =>{
    node.addEventListener('click',()=>{
        gameHandler.markTile(node.id)
    })
})

resetButton.addEventListener('click',()=>{
    gameHandler.reset();
    resetButton.style.display = 'none';
    winIndicator.textContent = '';
})