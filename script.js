const cards = document.querySelectorAll("div.card")
console.log(cards);


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
            for (let x=0; x<3; x++){
                const card = cards.item(y*3+x);
                card.textContent = board[y][x] == '.' ? '' : board[y][x];
            }
        }
    }
    return {placeX, placeO, wipe, checkWin, visualize}
})();

const gameHandler = (function(){
    let tick = 0;
    const markTile = (num)=>{
        const row = Math.floor((num-1)/3);
        const column = (num-1)%3;
        if (tick%2 == 0){
            if (!gameBoard.placeX(column, row)) return false;
        } else {
            if (!gameBoard.placeO(column, row)) return false;
        }   
        if(gameBoard.checkWin() != false){
            gameBoard.wipe();
            tick = 0;
        };
        if(tick >= 9){
            gameBoard.wipe();
            tick = 0;
        }
        gameBoard.visualize();
        tick++;
    }
    return {markTile}
})();

cards.forEach(node =>{
    node.addEventListener('click',()=>{
        gameHandler.markTile(node.id)
    })
})