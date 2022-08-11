
// gameboard can take in coordinates that are between 1 - 10 & a - J

const gameboardFactory = (user) => {

    const gameboard = {
        user: user,
        ships: [],
        hits: [],
        misses: []
    }

    let fleetDestroyed = false;

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
        let shipIsSunk = false;

        // loop through each placed ship, if there is a hit on a ship
        // push that hit to the hit array on gameboard and change the state of the hit variable to true
        gameboard.ships.forEach((ship) => {
            if (ship.coordinates.includes(enemyAttack)) {
                gameboard.hits.push(enemyAttack);
                ship.hit(enemyAttack);
                ship.sunk = ship.getSunk();
                hit = true;

                if (ship.sunk === true) {
                    shipIsSunk = true;
                    allShipsSunk();
                }
            } 
        })

        if (hit === false) {
            console.log(`${enemyAttack} is a miss`);
            gameboard.misses.push(enemyAttack);
        }

        return { hit, shipIsSunk};
    }

    const allShipsSunk = () => {

        let result = gameboard.ships.every((ship) => {
            if (ship.sunk !== true) {
                return false;
            } 
            return true;
        })

        if (result === false) {
            console.log('some ships remain');
        } else {
            console.log('all ships have been destroyed');
        }

        return result;
    }

    return { gameboard, fleetDestroyed, placeShip, receiveAttack, allShipsSunk}
}

export { gameboardFactory }