
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
        gameboard.ships.forEach((ship) => {
            if (ship.coordinates.includes(enemyAttack)) {
                console.log('direct hit');
            }
        })
    }

    return { gameboard, placeShip, receiveAttack}
}

export { gameboardFactory }