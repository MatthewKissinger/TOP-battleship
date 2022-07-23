import { shipFactory } from "../components/shipFactory";

// ** Only test public methods **

test('enemy attack misses ship', () => {
    let patrolBoat1 = shipFactory('patrolBoat1', 2, ['a2', 'a3']);

    expect(patrolBoat1.hit('a1')).toBe('a1 is a miss on patrolBoat1');
})

test('enemy attack hits ship', () => {
    let patrolBoat1 = shipFactory('patrolBoat1', 2, ['a2', 'a3']);

    expect(patrolBoat1.hit('a2')).toBe('a2 is a direct hit on patrolBoat1');
})

test('ship is sunk', () => {
    let patrolBoat1 = shipFactory('patrolBoat1', 2, ['a2', 'a3']);

    expect(patrolBoat1.isSunk(['a2', 'a3'])).toBe('patrolBoat1 is sunk');
})

// test for enemy attack hitting ship and sinking it