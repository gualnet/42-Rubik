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
  // const cubie = new CubieCube()
  // console.log('->', cubie);
  const face = new FaceletCube();
  const str = face.toString()
  console.log("STR", str)

  return true;
};

export default resolver;