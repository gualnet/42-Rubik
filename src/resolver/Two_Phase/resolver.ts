import CubieCube from './CubieCube';
import FaceletCube from './FaceCube';

/**
 * Kociemba's Two Phase Algorithm
 * Phase 1 - Solve the cube into a certain state
 * Phase 2: Solve the rest of the cube
 */


/* ********** ********** ********** ********** **********
 *? ******** *
 *? RESOLVER *
 *? ******** *
 */
const resolver = () => {
  console.log("TWO_PHASES")
  const cubie = new CubieCube()
  // console.log('->', cubie);


  console.log('FaceletCube')
  const faceletCube = new FaceletCube()
  // console.log('->', faceletCube);
  faceletCube.toCubieCube()




  return true;
};

export default resolver;