
import _ from 'lodash';
/**
 * Kociemba's Two Phase Algorithm
 */

/**
 * A RUBIK cube is defined by
 * the Corners: URF, ULF, ULB, UBR, DFR, DLF, DBL, DRB
 * the Edges: UR, UF, UL, UB, DR ,DF, DL, DB, FR, FL, BL, BR
 */
enum RUBIK {
  URF="URF", ULF="ULF", ULB="ULB", UBR="UBR", DFR="DFR", DLF="DLF", DBL="DBL", DRB="DRB",
  UR="UR", UF="UF", UL="UL", UB="UB", DR="DR",DF="DF", DL="DL", DB="DB", FR="FR", FL="FL", BL="BL", BR="BR",
}
const Corners: object = {
  [RUBIK.URF]: {c: RUBIK.URF, o: 0},
  [RUBIK.ULF]: {c: RUBIK.ULF, o: 0},
  [RUBIK.ULB]: {c: RUBIK.ULB, o: 0},
  [RUBIK.UBR]: {c: RUBIK.UBR, o: 0}, 
  [RUBIK.DFR]: {c: RUBIK.DFR, o: 0},
  [RUBIK.DLF]: {c: RUBIK.DLF, o: 0},
  [RUBIK.DBL]: {c: RUBIK.DBL, o: 0},
  [RUBIK.DRB]: {c: RUBIK.DRB, o: 0},
};
const Edges = {
  [RUBIK.UR]: {e: RUBIK.UR, o: 0},
  [RUBIK.UF]: {e: RUBIK.UF, o: 0},
  [RUBIK.UL]: {e: RUBIK.UL, o: 0},
  [RUBIK.UB]: {e: RUBIK.UB, o: 0},
  [RUBIK.DR]: {e: RUBIK.DR, o: 0},
  [RUBIK.DF]: {e: RUBIK.DF, o: 0},
  [RUBIK.DL]: {e: RUBIK.DL, o: 0},
  [RUBIK.DB]: {e: RUBIK.DB, o: 0},
  [RUBIK.FR]: {e: RUBIK.FR, o: 0},
  [RUBIK.FL]: {e: RUBIK.FL, o: 0},
  [RUBIK.BL]: {e: RUBIK.BL, o: 0},
  [RUBIK.BR]: {e: RUBIK.BR, o: 0},
}


/* ********** ********** ********** ********** ********** **********
 *? ******* *
 *? HELPERS *
 *? ******* *
 */
// create a cube ate the cubie level
const createCubieCube = () => {
  const cube = {
    corners: _.cloneDeep(Corners) ,
    edges: _.cloneDeep(Edges),
  };

  // console.log("CREATE CUBIE CUBE", cube);
  return cube;
};
const isGreaterThan= (element: RUBIK, refElement: RUBIK) => {
  // HELPER
  const edgeTab = [RUBIK.UR, RUBIK.UF, RUBIK.UL, RUBIK.UB, RUBIK.DR,RUBIK.DF, RUBIK.DL, RUBIK.DB, RUBIK.FR, RUBIK.FL, RUBIK.BL, RUBIK.BR];
  const cornerTab = [RUBIK.URF, RUBIK.ULF, RUBIK.ULB, RUBIK.UBR, RUBIK.DFR, RUBIK.DLF, RUBIK.DBL, RUBIK.DRB];
  const tab = edgeTab.includes(refElement) ? edgeTab : cornerTab;
  if (tab.indexOf(element) >= tab.indexOf(refElement)) return true;
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
    occupied[i] = isGreaterThan(edge.e, RUBIK.FR);
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


/* ********** ********** ********** ********** **********
 *? ******** *
 *? RESOLVER *
 *? ******** *
 */
const resolver = async () => {
  // console.log("Corners", Corners);
  // cornerOrientationCoordinate();
  // edgeOrientationCoordinate();
  // UDSliceCoordinate();
  genTwistMoveTable();

  return true;
};

export default resolver;