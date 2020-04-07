import _ from 'lodash';

import { Corners as CORNERS, Edges as EDGES } from './enums';

interface ICorner {
  c: CORNERS, // current corner/place
  o: number,  // current orientation  0-3
}
interface IEdge {
  e: EDGES, // current edge/place
  o: number, // current orientation 0-2
}
interface ICorners {
  [CORNERS.URF]: ICorner,
  [CORNERS.ULF]: ICorner,
  [CORNERS.ULB]: ICorner,
  [CORNERS.UBR]: ICorner,
  [CORNERS.DFR]: ICorner,
  [CORNERS.DLF]: ICorner,
  [CORNERS.DBL]: ICorner,
  [CORNERS.DRB]: ICorner,
}
interface IEdges {
  [EDGES.UR]: IEdge,
  [EDGES.UF]: IEdge,
  [EDGES.UL]: IEdge,
  [EDGES.UB]: IEdge,
  [EDGES.DR]: IEdge,
  [EDGES.DF]: IEdge,
  [EDGES.DL]: IEdge,
  [EDGES.DB]: IEdge,
  [EDGES.FR]: IEdge,
  [EDGES.FL]: IEdge,
  [EDGES.BL]: IEdge,
  [EDGES.BR]: IEdge,
}

class CubieCube {
  corners: ICorners;
  edges: IEdges;


  constructor(corners: ICorners, edges: IEdges) {
    this.corners = corners ? corners : _.cloneDeep(Corners);
    this.edges = edges ? edges : _.cloneDeep(Edges);

  }
};

const Corners: ICorners = {
  [CORNERS.URF]: {c: CORNERS.URF, o: 0},
  [CORNERS.ULF]: {c: CORNERS.ULF, o: 0},
  [CORNERS.ULB]: {c: CORNERS.ULB, o: 0},
  [CORNERS.UBR]: {c: CORNERS.UBR, o: 0}, 
  [CORNERS.DFR]: {c: CORNERS.DFR, o: 0},
  [CORNERS.DLF]: {c: CORNERS.DLF, o: 0},
  [CORNERS.DBL]: {c: CORNERS.DBL, o: 0},
  [CORNERS.DRB]: {c: CORNERS.DRB, o: 0},
};
const Edges: IEdges = {
  [EDGES.UR]: {e: EDGES.UR, o: 0},
  [EDGES.UF]: {e: EDGES.UF, o: 0},
  [EDGES.UL]: {e: EDGES.UL, o: 0},
  [EDGES.UB]: {e: EDGES.UB, o: 0},
  [EDGES.DR]: {e: EDGES.DR, o: 0},
  [EDGES.DF]: {e: EDGES.DF, o: 0},
  [EDGES.DL]: {e: EDGES.DL, o: 0},
  [EDGES.DB]: {e: EDGES.DB, o: 0},
  [EDGES.FR]: {e: EDGES.FR, o: 0},
  [EDGES.FL]: {e: EDGES.FL, o: 0},
  [EDGES.BL]: {e: EDGES.BL, o: 0},
  [EDGES.BR]: {e: EDGES.BR, o: 0},
};

const Moves = {
  up: {
    e: [Corners[CORNERS.UBR], ]
  }
}


/* ********** ********** ********** ********** ********** **********
 *? ******* *
 *? HELPERS *
 *? ******* *
 */
// create a cube ate the cubie level
const createCubieCube = () => {
  const cube = {
    corners: _.cloneDeep(Corners),
    edges: _.cloneDeep(Edges),
  };

  // console.log("CREATE CUBIE CUBE", cube);
  return cube;
};
const edgeIsGreaterThan= (element: EDGES, refElement: EDGES) => {
  // HELPER
  const edgesTab = [EDGES.UR, EDGES.UF, EDGES.UL, EDGES.UB, EDGES.DR,EDGES.DF, EDGES.DL, EDGES.DB, EDGES.FR, EDGES.FL, EDGES.BL, EDGES.BR];
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
    occupied[i] = edgeIsGreaterThan(edge.e, EDGES.FR);
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