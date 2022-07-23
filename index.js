// TO DO 



// -- JS SANDBOX --
import { shipFactory } from "./components/shipFactory.js";

const patrolBoat1 = shipFactory('patrolBoat1', 2, ['a2', 'a3']);

patrolBoat1.hit('a2');

patrolBoat1.hit('b5');

patrolBoat1.hit('a3');
