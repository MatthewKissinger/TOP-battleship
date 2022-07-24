
import { shipFactory } from "../components/shipFactory";
import { gameboardFactory } from "../components/gameboardFactory";


test('place ship into placedShips array', () => {
    let patrolBoat1 = shipFactory('patrolBoat1', 2, ['a2', 'a3']);

    const mattBoard = gameboardFactory('Matt');
    mattBoard.placeShip(patrolBoat1);

    expect(mattBoard.gameboard).toEqual({
        user: 'Matt',
        ships: [
            {
            shipName: 'patrolBoat1',
            coordinates: ['a2', 'a3']
            }    
        ],
        hits: [],
        misses: []
    });
})