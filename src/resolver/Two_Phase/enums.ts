/**
 * A RUBIK cube is defined by
 * the Corners: URF, ULF, ULB, UBR, DFR, DLF, DBL, DRB
 * the Edges: UR, UF, UL, UB, DR ,DF, DL, DB, FR, FL, BL, BR
 */
// enum RUBIK {
//   URF="URF", ULF="ULF", ULB="ULB", UBR="UBR", DFR="DFR", DLF="DLF", DBL="DBL", DRB="DRB",
//   UR="UR", UF="UF", UL="UL", UB="UB", DR="DR",DF="DF", DL="DL", DB="DB", FR="FR", FL="FL", BL="BL", BR="BR",
// }
// export enum ECorners {
//   URF="URF", ULF="ULF", ULB="ULB", UBR="UBR",
//   DFR="DFR", DLF="DLF", DBL="DBL", DRB="DRB",
// };
export enum ECorners {
  URF, ULF, ULB, UBR, DFR, DLF, DBL, DRB,
};
export const CornersArr = ["URF", "ULF", "ULB", "UBR", "DFR", "DLF", "DBL", "DRB"];
export const CornersNb = 8;

export enum EEdges {
  UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR,
};
export const EdgesArr = ["UR", "UF", "UL", "UB", "DR", "DF", "DL", "DB", "FR", "FL", "BL", "BR"];
export const EdgesNb = 12;


/**
 * The Facelet describes the cube like so:
 *             |************|
 *             |*U1**U2**U3*|
 *             |************|
 *             |*U4**U5**U6*|
 *             |************|
 *             |*U7**U8**U9*|
 *             |************|
 * ************|************|************|************|
 * *L1**L2**L3*|*F1**F2**F3*|*R1**R2**F3*|*B1**B2**B3*|
 * ************|************|************|************|
 * *L4**L5**L6*|*F4**F5**F6*|*R4**R5**R6*|*B4**B5**B6*|
 * ************|************|************|************|
 * *L7**L8**L9*|*F7**F8**F9*|*R7**R8**R9*|*B7**B8**B9*|
 * ************|************|************|************|
 *             |************|
 *             |*D1**D2**D3*|
 *             |************|
 *             |*D4**D5**D6*|
 *             |************|
 *             |*D7**D8**D9*|
 *             |************|
 */
export enum EFacelets {
  U1, U2, U3, U4, U5, U6, U7, U8, U9,
  R1, R2, R3, R4, R5, R6, R7, R8, R9,
  F1, F2, F3, F4, F5, F6, F7, F8, F9,
  D1, D2, D3, D4, D5, D6, D7, D8, D9,
  L1, L2, L3, L4, L5, L6, L7, L8, L9,
  B1, B2, B3, B4, B5, B6, B7, B8, B9,
};
export const FaceletsArr = [
  'U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9',
  'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9',
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9',
  'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9',
  'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9',
  'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9',
];
export const FaceletsNb = 54;

export enum EColors { U, R, F, D, L, B };
export const ColorsArr = ['U', 'R', 'F', 'D', 'L', 'B'];
export const ColorsNb = 6;