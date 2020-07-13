import _ from 'lodash';

import CubieCube from './CubieCube';
import { ECorners, EEdges, EBasicSym } from './enums';
import D from './defines';


// ########## Permutations and orientation changes of the basic symmetries ##########

// 120° clockwise rotation around the long diagonal URF-DBL
const cpROT_URF3 = [ECorners.URF, ECorners.DFR, ECorners.DLF, ECorners.ULF, ECorners.UBR, ECorners.DRB, ECorners.DBL, ECorners.ULB]
const coROT_URF3 = [1, 2, 1, 2, 2, 1, 2, 1]
const epROT_URF3 = [EEdges.UF, EEdges.FR, EEdges.DF, EEdges.FL, EEdges.UB, EEdges.BR, EEdges.DB, EEdges.BL, EEdges.UR, EEdges.DR, EEdges.DL, EEdges.UL]
const eoROT_URF3 = [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1]

// 180° rotation around the axis through the F and B centers
const cpROT_F2 = [ECorners.DLF, ECorners.DFR, ECorners.DRB, ECorners.DBL, ECorners.ULF, ECorners.URF, ECorners.UBR, ECorners.ULB]
const coROT_F2 = [0, 0, 0, 0, 0, 0, 0, 0]
const epROT_F2 = [EEdges.DL, EEdges.DF, EEdges.DR, EEdges.DB, EEdges.UL, EEdges.UF, EEdges.UR, EEdges.UB, EEdges.FL, EEdges.FR, EEdges.BR, EEdges.BL]
const eoROT_F2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

// 90° clockwise rotation around the axis through the U and D centers
const cpROT_U4 = [ECorners.UBR, ECorners.URF, ECorners.ULF, ECorners.ULB, ECorners.DRB, ECorners.DFR, ECorners.DLF, ECorners.DBL]
const coROT_U4 = [0, 0, 0, 0, 0, 0, 0, 0]
const epROT_U4 = [EEdges.UB, EEdges.UR, EEdges.UF, EEdges.UL, EEdges.DB, EEdges.DR, EEdges.DF, EEdges.DL, EEdges.BR, EEdges.FR, EEdges.FL, EEdges.BL]
const eoROT_U4 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]

// reflection at the plane through the U, D, F, B centers
const cpMIRR_LR2 = [ECorners.ULF, ECorners.URF, ECorners.UBR, ECorners.ULB, ECorners.DLF, ECorners.DFR, ECorners.DRB, ECorners.DBL]
const coMIRR_LR2 = [3, 3, 3, 3, 3, 3, 3, 3]
const epMIRR_LR2 = [EEdges.UL, EEdges.UF, EEdges.UR, EEdges.UB, EEdges.DL, EEdges.DF, EEdges.DR, EEdges.DB, EEdges.FL, EEdges.FR, EEdges.BR, EEdges.BL]
const eoMIRR_LR2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const basicSymCube = [];
// basicSymCube[EBasicSym.ROT_URF3] = new CubieCube(cpROT_URF3, coROT_URF3, epROT_URF3, eoROT_URF3);
basicSymCube[EBasicSym.ROT_URF3] = new CubieCube();
basicSymCube[EBasicSym.ROT_F2] = new CubieCube(cpROT_F2, coROT_F2, epROT_F2, eoROT_F2);
basicSymCube[EBasicSym.ROT_U4] = new CubieCube(cpROT_U4, coROT_U4, epROT_U4, eoROT_U4);
basicSymCube[EBasicSym.MIRR_LR2] = new CubieCube(cpMIRR_LR2, coMIRR_LR2, epMIRR_LR2, eoMIRR_LR2);
//

// * Fill SymCube list
export let symCube: Array<CubieCube> = [];
const cc = new CubieCube();
let idx = 0;
for (let urf3 = 0; urf3 < 3; urf3++) {
  for (let f2 = 0; f2 < 2; f2++) {
    for (let u4 = 0; u4 < 4; u4++) {
      for (let lr2 = 0; lr2 < 2; lr2++) {
        symCube = symCube.concat(new CubieCube(cc.cornersPermutation, cc.cornersOrientation, cc.edgesPermutation, cc.edgesOrientation));
        idx++;
        cc.multiply(basicSymCube[EBasicSym.MIRR_LR2]);
      }
      cc.multiply(basicSymCube[EBasicSym.ROT_U4]);
    }
    cc.multiply(basicSymCube[EBasicSym.ROT_F2]);
  }
  cc.multiply(basicSymCube[EBasicSym.ROT_URF3]);
};
//

// * Fille the invert index array
export const invIdx = _.fill(new Array(D.N_SYM), 0);
for (let j = 0; j < D.N_SYM; j++) {
  for (let i = 0; i < D.N_SYM; i++) {
    let cc = new CubieCube(symCube[j].cornersPermutation, symCube[j].cornersOrientation, symCube[j].edgesPermutation, symCube[j].edgesOrientation);
    cc.cornerMultiply(symCube[i]);
    if (cc.cornersPermutation[ECorners.URF] === ECorners.URF
    && cc.cornersPermutation[ECorners.ULF] === ECorners.ULF
    && cc.cornersPermutation[ECorners.ULB] === ECorners.ULB) {
      invIdx[j] = i;
      break;
    }
  }
};