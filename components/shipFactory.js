const shipFactory = (name, length, coordinates) => {
    const hitArray = [];
    let sunk = false;

    const getName = () => {
        console.log(name);
    }

    const getLength = () => {
        console.log(length);
    }

    const getHitArray = () => {
        console.log(hitArray);
    }

    const getCoordinates = () => {
        console.log(coordinates);
    }

    const getSunk = () => {
        return sunk;
    }

    const hit = (enemyAttack) => {
        if (coordinates.includes(enemyAttack)) {
            hitArray.push(enemyAttack); 
            getHitArray();
            isSunk(hitArray);
            return `${enemyAttack} is a direct hit on ${name}`;
        } else {
            return `${enemyAttack} is a miss on ${name}`;
        }
    }
    
    const isSunk = (hitArray) => {
        if (hitArray.length === length) {
            sunk = true;
            return `${name} is sunk`;
        } else {
            return `${name} is not sunk`;
        }
    }

    return { getName, getLength, getHitArray, getCoordinates, getSunk, hit, isSunk }
}

export { shipFactory }