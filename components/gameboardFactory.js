import { shipFactory } from "./shipFactory.js"

// gameboard can take in coordinates that are 1 - 10 & a - J

const gameboardFactory = (user) => {

    const placedShips = {
        [user]: user,
        ships: []
    }

    // place ship function using the shipFactory function -- 
    // update a gameboard object when placing a ship
    // can't place a ship on an already used location
    const placeShip = (shipName) => {
        placedShips.ships.push(
            {
                shipName: shipName.getName(),
                coordinates: shipName.getCoordinates(),
            }
        ) 
    }

    return { placedShips, placeShip}
}

export { gameboardFactory }