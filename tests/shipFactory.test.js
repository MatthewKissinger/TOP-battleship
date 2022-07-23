import { shipFactory } from "../components/shipFactory";

test('enemy attack misses ship', () => {
    let patrolBoat1 = shipFactory('patrolBoat1', 2, ['a2', 'a3']);

    expect(patrolBoat1.hit('a1')).toBe('a1 is a miss on patrolBoat1');
})