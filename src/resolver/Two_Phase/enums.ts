/**
 * A RUBIK cube is defined by
 * the Corners: URF, ULF, ULB, UBR, DFR, DLF, DBL, DRB
 * the Edges: UR, UF, UL, UB, DR ,DF, DL, DB, FR, FL, BL, BR
 */
// enum RUBIK {
//   URF="URF", ULF="ULF", ULB="ULB", UBR="UBR", DFR="DFR", DLF="DLF", DBL="DBL", DRB="DRB",
//   UR="UR", UF="UF", UL="UL", UB="UB", DR="DR",DF="DF", DL="DL", DB="DB", FR="FR", FL="FL", BL="BL", BR="BR",
// }
export enum Corners {
  URF="URF", ULF="ULF", ULB="ULB", UBR="UBR",
  DFR="DFR", DLF="DLF", DBL="DBL", DRB="DRB",
};
export enum Edges {
  UR="UR", UF="UF", UL="UL", UB="UB",
  DR="DR", DF="DF", DL="DL", DB="DB",
  FR="FR", FL="FL", BL="BL", BR="BR",
};