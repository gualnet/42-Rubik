import _ from 'lodash';

import { ECorners, EEdges, EFacelets } from './enums';
import { ICorner, ICorners, IEdge, IEdges } from './interfaces';

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
  corners: ICorners;
  edges: IEdges;

  constructor(corners?: ICorners, edges?: IEdges) {
    this.corners = corners ? corners : _.cloneDeep(Corners);
    this.edges = edges ? edges : _.cloneDeep(Edges);
  }
};




//------------------------------------------------------------------------

/* ********** ********** ********** ********** ********** **********
 *? ******* *
 *? HELPERS *
 *? ******* *
 */
// create a cube at cubie level
const createCubieCube = () => {
  const cube = {
    corners: _.cloneDeep(Corners),
    edges: _.cloneDeep(Edges),
  };

  // console.log("CREATE CUBIE CUBE", cube);
  return cube;
};
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
  const cube = createCubieCube();

  for (let i = 0; i < cornerMaxCoord; i++) {

  }


  console.log("genTwistMoveTable END\n\n\n")

};

export default CubieCube;