const shipFactory = (name, length, coordinates) => {
    const hitArray = [];
    let sunk = false;

    // create getter functions for length, hitArray and coordinates
    // research public vs. private methods for factory functions
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
            console.log(`${name} is sunk`);
        } else {
            console.log(`${name} is not sunk`);
        }
    }

    return { getName, getLength, getHitArray, getCoordinates, hit, isSunk }
}

export { shipFactory }