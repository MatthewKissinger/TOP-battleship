const shipFactory = (shipName, length, coordinates) => {
    const hitArray = [];
    let sunk = false;

    const getName = () => {
        return shipName;
    }

    const getLength = () => {
        console.log(length);
    }

    const getHitArray = () => {
        console.log(hitArray);
    }

    const getCoordinates = () => {
        return coordinates;
    }

    const getSunk = () => {
        return sunk;
    }

    const hit = (enemyAttack) => {
        if (coordinates.includes(enemyAttack)) {
            hitArray.push(enemyAttack); 
            getHitArray();
            isSunk(hitArray);
            return `${enemyAttack} is a direct hit on ${shipName}`;
        } else {
            return `${enemyAttack} is a miss on ${shipName}`;
        }
    }
    
    const isSunk = (hitArray) => {
        if (hitArray.length === length) {
            sunk = true;
            return `${shipName} is sunk`;
        } else {
            return `${shipName} is not sunk`;
        }
    }

    return { getName, getLength, getHitArray, getCoordinates, getSunk, hit, isSunk }
}

export { shipFactory }