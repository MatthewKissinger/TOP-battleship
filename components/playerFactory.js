// player factory that creates a player and a computer player 
// it takes in the argument of name

const playerFactory = (name) => {
    let isTurn = false;

    const getIsTurn = () => {
        console.log(isTurn);
    }

    const toggleTurn = () => {
        if (isTurn === false) {
            isTurn = true;
        } else {
            isTurn = false;
        }
    }

    const playerAttack = (coordinate, enemyBoard) => {
       
        // check to see if the coordinate provided has already been played
        // if it returns false - run the computer play again
        if (enemyBoard.gameboard.misses.includes(coordinate) || enemyBoard.gameboard.hits.includes(coordinate)) {
            console.log('that square has been called');
            return false;
        } else {
            let message = enemyBoard.receiveAttack(coordinate);
            return message;
        }
    }

    // function to get a random coordinate for computer player
    // if the coordinate has already been played pick another random coordinate (aka rerun the function until you get a fresh one)
    const randomCoordinate = () => {
        let letterRandom = Math.floor((Math.random() * 10) + 1);
        let letterCoordinate;

        switch(letterRandom) {
            case 1: 
                letterCoordinate = 'a';
                break;
            case 2: 
                letterCoordinate = 'b';
                break;
            case 3: 
                letterCoordinate = 'c';
                break;
            case 4: 
                letterCoordinate = 'd';
                break;
            case 5: 
                letterCoordinate = 'e';
                break;
            case 6:
                letterCoordinate = 'f';
                break;
            case 7: 
                letterCoordinate = 'g';
                break;
            case 8:
                letterCoordinate = 'h';
                break;
            case 9: 
                letterCoordinate = 'i';
                break;
            case 10:
                letterCoordinate = 'j';
                break;
        }
        
        let numberCoordinate = Math.floor((Math.random() * 10) + 1);

        return letterCoordinate + numberCoordinate;
    }

    return { name, getIsTurn, toggleTurn, playerAttack, randomCoordinate }
}

export { playerFactory }