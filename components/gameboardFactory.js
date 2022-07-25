
// gameboard can take in coordinates that are 1 - 10 & a - J

const gameboardFactory = (user) => {

    const gameboard = {
        user: user,
        ships: [],
        hits: [],
        misses: []
    }

    // can't place a ship on an already used location
    // maybe test for this during UI implementation
    const placeShip = (shipName) => {
        gameboard.ships.push(
            {
                ...shipName,
                shipName: shipName.getName(),
                coordinates: shipName.getCoordinates(),
                sunk: shipName.getSunk()
            }
        ) 
    }

    // create a receiveAttack function -- will test whether a ship is hit in the gameboard object -- if a ship is hit push the coordinate to the hits array, if not push to the misses array
    const receiveAttack = (enemyAttack) => {
        let hit = false;

        // loop through each placed ship, if there is a hit on a ship
        // push that hit to the hit array on gameboard and change the state of the hit variable to true
        gameboard.ships.forEach((ship) => {
            if (ship.coordinates.includes(enemyAttack)) {
                console.log(`${enemyAttack} is a direct hit on ${ship.shipName}`);
                gameboard.hits.push(enemyAttack);
                ship.hit(enemyAttack);
                ship.sunk = ship.getSunk();
                hit = true;
            } 

            if (ship.sunk === true) {
                console.log(`${ship.shipName} is sunk`);
                allShipsSunk();
            }
        })

        if (hit === false) {
            console.log(`${enemyAttack} is a miss`);
            gameboard.misses.push(enemyAttack);
        }
    }

    const allShipsSunk = () => {

        gameboard.ships.every((ship) => {
            if (ship.sunk !== true) {
                console.log('some ships remain');
                return false;
            } 

            console.log('all ships have been destroyed');
            return true;
        })
    }

    return { gameboard, placeShip, receiveAttack}
}

export { gameboardFactory }