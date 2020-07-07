import _ from 'lodash';

import FaceletCube from './FaceCube';
import basicMoves from './basicMoves';
import { EColors, ECorners, EEdges, EFacelets } from './enums';
import { ICorner, ICorners, IEdge, IEdges } from './interfaces';
import * as Enums from './enums';

const Corners: ICorners = {
  [ECorners.URF]: {c: ECorners.URF, o: 0},
  [ECorners.ULF]: {c: ECorners.ULF, o: 0},
  [ECorners.ULB]: {c: ECorners.ULB, o: 0},
  [ECorners.UBR]: {c: ECorners.UBR, o: 0}, 
  [ECorners.DFR]: {c: ECorners.DFR, o: 0},
  [ECorners.DLF]: {c: ECorners.DLF, o: 0},
  [ECorners.DBL]: {c: ECorners.DBL, o: 0},
  [ECorners.DRB]: {c: ECorners.DRB, o: 0},
};
const Edges: IEdges = {
  [EEdges.UR]: {e: EEdges.UR, o: 0},
  [EEdges.UF]: {e: EEdges.UF, o: 0},
  [EEdges.UL]: {e: EEdges.UL, o: 0},
  [EEdges.UB]: {e: EEdges.UB, o: 0},
  [EEdges.DR]: {e: EEdges.DR, o: 0},
  [EEdges.DF]: {e: EEdges.DF, o: 0},
  [EEdges.DL]: {e: EEdges.DL, o: 0},
  [EEdges.DB]: {e: EEdges.DB, o: 0},
  [EEdges.FR]: {e: EEdges.FR, o: 0},
  [EEdges.FL]: {e: EEdges.FL, o: 0},
  [EEdges.BL]: {e: EEdges.BL, o: 0},
  [EEdges.BR]: {e: EEdges.BR, o: 0},
};

class CubieCube {
  cornersPosition: Array<ECorners>;
  edgesPosition: Array<EEdges>;
  cornersOrientation: Array<number>;
  edgesOrientation: Array<number>;

  constructor(cornersPos?: Array<ECorners>, cornersOri?: Array<number>, edgesPos?: Array<EEdges>, edgesOri?: Array<number>) {
    const initCornerPosition = [ECorners.URF, ECorners.ULF, ECorners.ULB, ECorners.UBR, ECorners.DFR, ECorners.DLF, ECorners.DBL, ECorners.DRB];
    const initEdgesPosition = [EEdges.UR, EEdges.UF, EEdges.UL, EEdges.UB, EEdges.DR, EEdges.DF, EEdges.DL, EEdges.DB, EEdges.FR, EEdges.FL, EEdges.BL, EEdges.BR]
    
    this.cornersPosition = cornersPos ? cornersPos : _.cloneDeep(initCornerPosition)
    this.cornersOrientation = cornersOri ? cornersOri : [];
    
    this.edgesPosition = edgesPos ? edgesPos : _.cloneDeep(initEdgesPosition);
    this.edgesOrientation = edgesOri? edgesOri : [];
  }

  /*****************
   * Return a facelet representation of the cube
   *****************/
  toFaceletCube: Function = () => {
    console.log('Call cubieCube.toFaceletCube()')
    const faceCube = new FaceletCube();
    
    Enums.CornersArr.map((value, idx) => {
      const idx2 = this.cornersPosition[idx];
      const orientation = this.cornersOrientation[idx];
      for (let n = 0; n < 3; n++) {
        faceCube.facelets[faceCube.cornerFacelet[idx][(n + orientation) % 3]] = faceCube.cornerColor[idx2][n];
      }
    });
    Enums.EdgesArr.map((value, idx) => {
      const idx2 = this.edgesPosition[idx];
      const orientation = this.edgesOrientation[idx];
      for (let n = 0; n < 2; n++) {
        faceCube.facelets[faceCube.edgeFacelet[idx][(n + orientation) % 2]] = faceCube.edgeColor[idx2][n];
      }
    });
    return faceCube;
  };

  /**
   * Multiply this cubie cube corners with another cubie cube (cubieB)
   * @param cubieB {CubieCube} cubie cube to multiply
   */
  cornerMultiply: Function = (cubieB: CubieCube) => {
    
    const cornerPermutation: Array<ECorners> = [];
    const cornerOrientation: Array<number> = [];
    Enums.CornersArr.map((value, idx) => {
      cornerPermutation[idx] = this.cornersPosition[cubieB.cornersPosition[idx]];

      const orientationA = this.cornersOrientation[cubieB.cornersOrientation[idx]];
      const orientationB = cubieB.cornersOrientation[idx];
      let orientation = 0;

      if (orientationA < 3 && orientationB < 3) { // two regular cubes
        let sum = orientationA + orientationB;
        orientation = (sum >= 3) ? sum - 3 : sum;
      } else if (orientationA < 3 && orientationB >= 3) { // cube b is in a mirrored state
        let sum = orientationA + orientationB;
        orientation = (sum >= 6) ? sum - 3 : sum; // composition of both is also in a mirrored state
      } else if (orientationA >= 3 && orientationB < 3) { // cube a is in a mirrored state
        let sub = orientationA - orientationB;
        orientation = (sub < 3) ? sub + 3 : sub; // composition of both is a mirrored cube
      } else if (orientationA >= 3 && orientationB >= 3) { // both cube are in mirrored state
        let sub = orientationA - orientationB;
        orientation = (sub < 0) ? sub + 3 : sub; // composition is a regular one.
      }
      cornerOrientation[idx] = orientation;
    });
    Enums.CornersArr.map((val, idx) => {
      this.cornersPosition[idx] = cornerPermutation[idx];
      this.cornersOrientation[idx] = cornerOrientation[idx];
    });
  };

  /**
   * Multiply this cubie cube edges with another cubie cube (cubieB)
   * @param cubieB
   */
  edgeMultiply: Function = (cubieB: CubieCube) => {
    const edgePermutation: Array<EEdges> = [];
    const edgeOrientation: Array<number> = [];

    Enums.EdgesArr.map((val, idx) => {
      edgePermutation[idx] = this.edgesPosition[cubieB.edgesPosition[idx]];
      edgeOrientation[idx] = (cubieB.edgesOrientation[idx] + this.edgesOrientation[cubieB.edgesPosition[idx]]) % 2;
    });

    Enums.EdgesArr.map((val, idx) => {
      this.edgesPosition[idx] = edgePermutation[idx];
      this.edgesOrientation[idx] = edgeOrientation[idx];
    });
  };

};




//------------------------------------------------------------------------

/* ********** ********** ********** ********** ********** **********
 *? ******* *
 *? HELPERS *
 *? ******* *
 */

const edgeIsGreaterThan= (element: EEdges, refElement: EEdges) => {
  // HELPER
  const edgesTab = [EEdges.UR, EEdges.UF, EEdges.UL, EEdges.UB, EEdges.DR,EEdges.DF, EEdges.DL, EEdges.DB, EEdges.FR, EEdges.FL, EEdges.BL, EEdges.BR];
  // const cornersTab = [CORNERS.URF, CORNERS.ULF, CORNERS.ULB, CORNERS.UBR, CORNERS.DFR, CORNERS.DLF, CORNERS.DBL, CORNERS.DRB];

  // const tab = edgesTab.includes(refElement) ? edgesTab : cornersTab;

  if (edgesTab.indexOf(element) >= edgesTab.indexOf(refElement)) return true;
  return false;
};
const binomial = (n:number, k:number): number => {
  // HELPER
  let coeff = 1;
  for (let x = n-k+1; x <= n; x++) coeff *= x;
  for (let x = 1; x <= k; x++) coeff /= x;
  console.log("binomial", n, k, coeff);
 return coeff;
};


/* ********** ********** ********** ********** **********
 *? *********************** *
 *? COORDINATES CALCULATORS *
 *? *********************** *
 */
const UDSliceCoordinate = () => {
  const occupied = new Array(11).fill(false);

  // Populate accupied tab
  let i = 0;
  for (let edge of Object.values(Edges)) {
    occupied[i] = edgeIsGreaterThan(edge.e, EEdges.FR);
    i++;
  };

  // 
  let result = 0;
  let k = 3;
  let n = 11;
  while (k >= 0 && n >= 0) {
    console.log("\n", n, k);
    if (occupied[n]) {
      k--;
    } else {
      result = result + binomial(n, k)
    }
    n--
  }
  return result;
};

/**
 * Corners orientation is described by a number from 0 to 2186 (3^7-1)
 */
const cornerOrientationCoordinate = () => {
  let pow = 6; // number of 
  let result = 0;
  const values: number[] = [];
  // console.log(Object.values(Corners));
  Object.values(Corners).map(value => values.push(value.o));
  values.pop(); // we don't need the last value

  for (let val of values) {
    result += val*3**pow;
    pow--;
  }
  return result;
};
/**
 * Corners orientation inverter
 */
const cornerInvertOrientationCoordinate = (x: number) => {
  let corners;
  let parrity = 0;


};

/**
 * Edges orientation is described by a number from 0 to 2047 (2^11-1)
 */
const edgeOrientationCoordinate = () => {
  let pow = 10;
  let result = 0;
  let values: number[] = [];

  Object.values(Edges).map(value => values.push(value.o));
  values.pop();
  for (let val of values) {
    result += val*2**pow;
    pow--;
  }
  return result;
};


/* ********** ********** ********** ********** **********
 *? ********************** *
 *? MOVE TABLES GENERATORS *
 *? ********************** *
 */
// CreateTwistMoveTable - for raw-coordinates
const genTwistMoveTable = () => {
  console.log("\ngenTwistMoveTable")
  const moveTable = [];
  const cornerMaxCoord = 2186 // 3^7-1 for the corners
  // const cube = createCubieCube();

  for (let i = 0; i < cornerMaxCoord; i++) {

  }


  console.log("genTwistMoveTable END\n\n\n")

};

export default CubieCube;