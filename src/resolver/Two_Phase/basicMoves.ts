import { EColors, ECorners, EEdges, EFacelets } from './enums';

/***************
 * BASIC MOVES *
 ***************/

const basicMoves = {
  up: {
    cp: [ECorners.UBR, ECorners.URF, ECorners.ULF, ECorners.ULB, ECorners.DFR, ECorners.DLF, ECorners.DBL, ECorners.DRB],
    co: [0, 0, 0, 0, 0, 0, 0, 0],
    ep: [EEdges.UB, EEdges.UR, EEdges.UF, EEdges.UL, EEdges.DR, EEdges.DF, EEdges.DL, EEdges.DB, EEdges.FR, EEdges.FL, EEdges.BL, EEdges.BR],
    eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  right: {
    cp: [ECorners.DFR, ECorners.ULF, ECorners.ULB, ECorners.URF, ECorners.DRB, ECorners.DLF, ECorners.DBL, ECorners.UBR],
    co: [2, 0, 0, 1, 1, 0, 0, 2],
    ep: [EEdges.FR, EEdges.UF, EEdges.UL, EEdges.UB, EEdges.BR, EEdges.DF, EEdges.DL, EEdges.DB, EEdges.DR, EEdges.FL, EEdges.BL, EEdges.UR],
    eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  front: {
    cp: [ECorners.ULF, ECorners.DLF, ECorners.ULB, ECorners.UBR, ECorners.URF, ECorners.DFR, ECorners.DBL, ECorners.DRB],
    co: [1, 2, 0, 0, 2, 1, 0, 0],
    ep: [EEdges.UR, EEdges.FL, EEdges.UL, EEdges.UB, EEdges.DR, EEdges.FR, EEdges.DL, EEdges.DB, EEdges.UF, EEdges.DF, EEdges.BL, EEdges.BR],
    eo: [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0],
  },
  Down: {
    cp: [ECorners.URF, ECorners.ULF, ECorners.ULB, ECorners.UBR, ECorners.DLF, ECorners.DBL, ECorners.DRB, ECorners.DFR],
    co: [0, 0, 0, 0, 0, 0, 0, 0],
    ep: [EEdges.UR, EEdges.UF, EEdges.UL, EEdges.UB, EEdges.DF, EEdges.DL, EEdges.DB, EEdges.DR, EEdges.FR, EEdges.FL, EEdges.BL, EEdges.BR],
    eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  left :{
    cp: [ECorners.URF, ECorners.ULB, ECorners.DBL, ECorners.UBR, ECorners.DFR, ECorners.ULF, ECorners.DLF, ECorners.DRB],
    co: [0, 1, 2, 0, 0, 2, 1, 0],
    ep: [EEdges.UR, EEdges.UF, EEdges.BL, EEdges.UB, EEdges.DR, EEdges.DF, EEdges.FL, EEdges.DB, EEdges.FR, EEdges.UL, EEdges.DL, EEdges.BR],
    eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  back: {
    cp: [ECorners.URF, ECorners.ULF, ECorners.UBR, ECorners.DRB, ECorners.DFR, ECorners.DLF, ECorners.ULB, ECorners.DBL],
    co: [0, 0, 1, 2, 0, 0, 2, 1],
    ep: [EEdges.UR, EEdges.UF, EEdges.UL, EEdges.BR, EEdges.DR, EEdges.DF, EEdges.DL, EEdges.BL, EEdges.FR, EEdges.FL, EEdges.UB, EEdges.DB],
    eo: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
  },
};

export default basicMoves;