
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
  [RUBIK.URF]: {c: RUBIK.URF, o: 2},
  [RUBIK.ULF]: {c: RUBIK.ULF, o: 0},
  [RUBIK.ULB]: {c: RUBIK.ULB, o: 0},
  [RUBIK.UBR]: {c: RUBIK.UBR, o: 1}, 
  [RUBIK.DFR]: {c: RUBIK.DFR, o: 1},
  [RUBIK.DLF]: {c: RUBIK.DLF, o: 0},
  [RUBIK.DBL]: {c: RUBIK.DBL, o: 0},
  [RUBIK.DRB]: {c: RUBIK.DRB, o: 2},
};
const Edges = {
  [RUBIK.UR]: {c: RUBIK.UR, o : 0},
  [RUBIK.UF]: {c: RUBIK.UF, o : 0},
  [RUBIK.UL]: {c: RUBIK.UL, o : 0},
  [RUBIK.UB]: {c: RUBIK.UB, o : 0},
  [RUBIK.DR]: {c: RUBIK.DR, o : 0},
  [RUBIK.DF]: {c: RUBIK.DF, o : 0},
  [RUBIK.DL]: {c: RUBIK.DL, o : 0},
  [RUBIK.DB]: {c: RUBIK.DB, o : 0},
  [RUBIK.FR]: {c: RUBIK.FR, o : 0},
  [RUBIK.FL]: {c: RUBIK.FL, o : 0},
  [RUBIK.BL]: {c: RUBIK.BL, o : 0},
  [RUBIK.BR]: {c: RUBIK.BR, o : 0},
}

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

const UDSliceCoordinate = () => {
  const array = new Array(11).fill(false);
  console.log(array);


};

const resolver = async () => {
  // console.log("Corners", Corners);
  const COC = cornerOrientationCoordinate();
  const EOC = edgeOrientationCoordinate();
  UDSliceCoordinate();

  return true;
};

export default resolver;