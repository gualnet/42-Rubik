import CubieCube from "./CubieCube";
import { symCube } from "./symmetries";
/**
 * 
 * @param CCube The cube to be solved in CubieCube representation
 * @param rot Rotates the  cube 120° * rot along the long diagonal before applying the two-phase-algorithm
 * @param inv 0: Do not invert the cube . 1: Invert the cube before applying the two-phase-algorithm
 * @param retLength If a solution with length <= ret_length is found the search stops.
 * @param timeout Maximal search time in seconds.
 * @param startTime The time the search started
 * @param solutions An array with the found solutions found by the six parallel threads
 * @param terminated An event shared by the six threads to signal a termination request
 * @param shortest_length The length of the shortes solutions in the solution array
 */
class SolverWorker {
  cubieCube: CubieCube;
  coordCube: undefined | any;
  rot: number;
  inv: boolean;
  SPhase1: any;
  SPhase2: any;
  // lock;
  retLength: number;
  timeout: any;
  startTime: any;

  cornerSave: number;

  // Shared between thread
  solutions: [];
  terminated: any;
  shortestLength: number;

  constructor(CCube: CubieCube, rot = 0, inv = false, retLength: number, timeout: any, startTime: any, solutions: [], terminated: any, shortestLength: number) {
    this.cubieCube = CCube;
    this.coordCube = undefined;
    this.rot = rot;
    this.inv = inv;
    this.SPhase1 = undefined;
    this.SPhase2 = undefined;
    // lock;
    this.retLength = retLength;
    this.timeout = timeout;
    this.startTime = startTime;

    this.cornerSave = 0;

    // Shared between thread
    this.solutions = solutions;
    this.terminated = terminated;
    this.shortestLength = shortestLength;
  };

  run = () => {
    let cubiecube: CubieCube;

    if (this.rot === 0) { // rotation 0°
      cubiecube = new CubieCube(this.cubieCube.cornersOrientation, this.cubieCube.cornersPermutation, this.cubieCube.edgesPermutation, this.cubieCube.edgesOrientation);
    } else if (this.rot === 1) { // rotation: 120°
      cubiecube = new CubieCube(symCube[32].cornersPermutation, symCube[32].cornersOrientation, symCube[32].edgesPermutation, symCube[32].edgesOrientation);
      cubiecube.multiply(this.cubieCube);
      cubiecube.multiply(symCube[16]);
    } else if (this.rot === 2) { // rotation: 240°
      cubiecube = new CubieCube(symCube[16].cornersPermutation, symCube[16].cornersOrientation, symCube[16].edgesPermutation, symCube[16].edgesOrientation);
      cubiecube.multiply(this.cubieCube);
      cubiecube.multiply(symCube[32]);
    } else {
      throw new Error(`[ERROR] solverWorker: rot value not allowed 0 < [${this.rot}] < 3`);
    }
    if (this.inv) {
      const tmpCubie = new CubieCube();
      cubiecube.invCubieCube(tmpCubie)
      cubiecube = tmpCubie
    }

    this.coordCube = 
  };


}