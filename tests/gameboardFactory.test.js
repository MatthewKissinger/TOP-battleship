import { shipFactory } from "../components/shipFactory";
import { gameboardFactory } from "../components/gameboardFactory";

    // global mock variables
    let destroyer = shipFactory('destroyer', 2, ['a2', 'a3']);

    const mattBoard = gameboardFactory('Matt');
    mattBoard.placeShip(destroyer);

test('place ship into placedShips array', () => {

    expect(mattBoard.gameboard.ships[0].shipName).toEqual('destroyer');
})

test('receive an attack as a hit', () => {

    mattBoard.receiveAttack('a2');

    expect(mattBoard.gameboard.hits).toEqual(['a2']);
})

test('receive an attack as a miss', () => {

    mattBoard.receiveAttack('a4');

    expect(mattBoard.gameboard.misses).toEqual(['a4']);
})

test('allShipsSunk function', () => {
    mattBoard.receiveAttack('a2');
    mattBoard.receiveAttack('a3');

    expect(mattBoard.allShipsSunk()).toEqual(true);
})