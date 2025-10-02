

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

    const visualize = ()=>{
        for (let y=0; y<3; y++){
            console.log(board[y][0] + ' ' + board[y][1] + ' ' + board[y][2])
            console.log('_____')
        }
    }
    return {placeX, placeO, wipe, checkWin, visualize}
})();

const gameHandler = (function(){
    let board = gameBoard;
    const playGame = ()=>{
        console.log("new game:")
        gameBoard.wipe()
        let tick = 0;
        let turn = tick;
        while (!gameBoard.checkWin() && tick < 9){
            console.log(`player ${tick+1} move:`)
            let px = prompt("x position?: ")
            let py = prompt("y position?: ")
            if (turn){
                while(!gameBoard.placeX(--px,--py)){
                    px = prompt("x position?: ");
                    py = prompt("y position?: ");
                }
            } else {
                while(!gameBoard.placeO(--px,--py)){
                    px = prompt("x position?: ");
                    py = prompt("y position?: ");
                }
            }
            gameBoard.visualize();
            tick++;
            turn = tick%2;
        }
        if (!gameBoard.checkWin()){
            console.log('tie!');
            return;
        }
        console.log(`player ${gameBoard.checkWin() == 'o' ? 1 : 2} wins`);
        return;
    }
    return {playGame}
})();

let killswitch = true;
while (killswitch){
    let win = gameHandler.playGame();
    if (win){
        let ans = prompt('press [enter] to play again: ')
        if (!ans){
            killswitch = false;
            break;
        }
    }
}
