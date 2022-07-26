import { shipFactory } from "../components/shipFactory";

// ** Only test public methods **

test('enemy attack misses ship', () => {
    let patrolBoat = shipFactory('patrolBoat', 2, ['a2', 'a3']);

    expect(patrolBoat.hit('a1')).toBe('a1 is a miss on patrolBoat');
})

test('enemy attack hits ship', () => {
    let patrolBoat = shipFactory('patrolBoat', 2, ['a2', 'a3']);

    expect(patrolBoat.hit('a2')).toBe('a2 is a direct hit on patrolBoat');
})

test('ship is sunk', () => {
    let patrolBoat = shipFactory('patrolBoat', 2, ['a2', 'a3']);

    expect(patrolBoat.isSunk(['a2', 'a3'])).toBe('patrolBoat is sunk');
})

// test for enemy attack hitting ship and sinking it