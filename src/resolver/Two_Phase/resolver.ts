import _ from 'lodash';

import CubieCube from './CubieCube';
import FaceletCube from './FaceCube';

/**
 * Kociemba's Two Phase Algorithm
 * Phase 1 - Solve the cube into a certain state
 * Phase 2: Solve the rest of the cube
 */

/**
 * 
 * @param cubeStr 
 * @param maxMoves 
 * @param timeout 
 */
const resolver = (cubeStr: string, maxMoves = 20, timeout = 3) => {
  console.log("TWO_PHASES_SOLVER");
  console.log(`PARAMS \nMAX MOVES:${maxMoves} \nTIME OUT:${timeout}`);
  

  
  // ********************
  try {
    cubeStr = 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB'
    // cubeStr = 'DUUBULDBFRBFRRULLLBRDFFFBLURDBFDFDRFRULBLUFDURRBLBDUDL'
    if (!cubeStr || cubeStr.length !== 54) {
      throw new Error('[ERROR] Resolver: invalide cube description string')
    }
  
    const faceCube = new FaceletCube();
    faceCube.fromString(cubeStr);

    const cubieCube = new CubieCube();
    const r = cubieCube.isValid();
    if (!r[0]) throw new Error(r[1]); // a cube juste created should be valid

    // THE MAGIC !
    const solutions = [];
    const syms = cubieCube.symmetries()
    let intersectionLen = (_.intersection([16, 20, 24, 28], syms)).length;
    let tr = (intersectionLen > 0) ? [0, 3] : [0, 1, 2, 3, 4, 5];
    intersectionLen = _.intersection(_.range(48, 96), syms).length
    if (intersectionLen > 0) {
      tr = tr.filter(value => value < 3);
    }
    let th;
    for (let i of tr) {
      // th = 
    }
    console.log("\n\n RESOLVER END")
  } catch (error) {
    console.log(error);
    return false;
  }
  
  return true;
};

export default resolver;