import fs from 'fs';
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

/**
 * Generate the tables to handle the symmetry reduced flip-slice coordinate in  phase 1
 */
// File names
const FILE_DIR_TABLE = './tables'
const FILE_CLASS_IDX = 'fs_classidx.rbk';
const FILE_SYM = 'fs_sym.rbk';
const FILE_REP = 'fs_rep.rbk';
const INVALID = 65535;
export let flipsliceClassIdx: Array<number>;
export let flipsliceSym: Array<number>;
export let flipsliceRep: Array<number>;
if (!fs.existsSync(`${FILE_DIR_TABLE}/${FILE_CLASS_IDX}`)
|| !fs.existsSync(`${FILE_DIR_TABLE}/${FILE_SYM}`)
|| !fs.existsSync(`${FILE_DIR_TABLE}/${FILE_REP}`)) {
  console.log('[INFO] Creating flipsplice symmetry tables...');
  
  flipsliceClassIdx = _.fill(new Array(D.N_FLIP * D.N_SLICE), INVALID) // idx -> classidx
  flipsliceSym = _.fill(new Array(D.N_FLIP * D.N_SLICE), 0); // idx -> symmetry
  flipsliceRep = _.fill(new Array(D.N_FLIPSLICE_CLASS), 0) // classidx -> idx of representant
  
  let classIdx = 0;
  let idx: number;
  let ss: CubieCube;
  let idxNew: number;
  let cc = new CubieCube();
  for (let sliceNb = 0; sliceNb < D.N_SLICE; sliceNb++) {
    cc.setSlice(sliceNb);
    for (let flipNb = 0; flipNb < D.N_FLIP; flipNb++) {
      cc.setFlip(flipNb);
      idx = D.N_FLIP * sliceNb + flipNb;
      if ((idx + 1) % 4000 === 0)
        process.stdout.write(".");
      if ((idx + 1) % 320000 === 0)
        process.stdout.write("\n");

      if (flipsliceClassIdx[idx] === INVALID) {
        flipsliceClassIdx[idx] = classIdx;
        flipsliceSym[idx] = 0;
        flipsliceRep[classIdx] = idx;
      } else {
        continue;
      }
      for (let symNb = 0; symNb < D.N_SYM_D4h; symNb++) {
        ss = new CubieCube(symCube[invIdx[symNb]].cornersPermutation, symCube[invIdx[symNb]].cornersOrientation, symCube[invIdx[symNb]].edgesPermutation, symCube[invIdx[symNb]].edgesOrientation);
        ss.edgeMultiply(cc);
        ss.edgeMultiply(symCube[symNb]);
        idxNew = D.N_FLIP * ss.getSlice() + ss.getFlip();
        if (flipsliceClassIdx[idxNew] === INVALID) {
          flipsliceClassIdx[idxNew] = classIdx;
          flipsliceSym[idxNew] = 5;
        }
      }
      classIdx++;
    }
  }

  process.stdout.write("\n");

  // let data = JSON.stringify(flipsliceClassIdx);
  // console.log(`write in: ${FILE_DIR_TABLE}/${FILE_CLASS_IDX}`);
  fs.writeFileSync(`${FILE_DIR_TABLE}/${FILE_CLASS_IDX}`, JSON.stringify(flipsliceClassIdx));
  // console.log("data", flipsliceClassIdx);
  

  // data = flipsliceSym;
  // console.log(`write in: ${FILE_DIR_TABLE}/${FILE_SYM}`);
  fs.writeFileSync(`${FILE_DIR_TABLE}/${FILE_SYM}`, JSON.stringify(flipsliceSym));
  // console.log("data", flipsliceSym);
  
  
  // data = flipsliceRep;
  // console.log(`write in: ${FILE_DIR_TABLE}/${FILE_REP}`);
  fs.writeFileSync(`${FILE_DIR_TABLE}/${FILE_REP}`, JSON.stringify(flipsliceRep));
  // console.log("data", flipsliceRep);



  console.log("write process end");

} else {

  console.log('Loading flipsplice symmetry tables...');
  let jsonstr: string;
  jsonstr = fs.readFileSync(`${FILE_DIR_TABLE}/${FILE_CLASS_IDX}`, { encoding: 'utf8' });
  const flipsliceClassIdx: Array<number> = JSON.parse(jsonstr);
  // console.log("data", flipsliceClassIdx);

  jsonstr = fs.readFileSync(`${FILE_DIR_TABLE}/${FILE_SYM}`, 'utf8');
  const flipsliceSym: Array<number> = JSON.parse(jsonstr);
  // console.log("data", flipsliceSym);

  jsonstr = fs.readFileSync(`${FILE_DIR_TABLE}/${FILE_REP}`, 'utf8');
  const flipsliceRep: Array<number> = JSON.parse(jsonstr);
  // console.log("data", flipsliceRep);
}

/**
 * Generate the tables to handle the symmetry reduced corner permutation coordinate in phase 2
 */
// File names
const FILE_CORNER_CLASS_IDX = 'co_classidx.rbk';
const FILE_cornerSym = 'co_sym.rbk';
const FILE_cornerRep = 'co_rep.rbk';
export let cornerClassIdx: Array<number>;
export let cornerSym: Array<number>;
export let cornerRep: Array<number>;
if (!fs.existsSync(`${FILE_DIR_TABLE}/${FILE_CORNER_CLASS_IDX}`)
|| !fs.existsSync(`${FILE_DIR_TABLE}/${FILE_cornerSym}`)
|| !fs.existsSync(`${FILE_DIR_TABLE}/${FILE_cornerRep}`)) {
  console.log("[INFO] Creating corner sym-tables...");

  cornerClassIdx = _.fill(new Array(D.N_CORNERS), INVALID) // idx -> classidx
  cornerSym = _.fill(new Array(D.N_CORNERS), 0) // idx -> symmetry
  cornerRep = _.fill(new Array(D.N_CORNERS_CLASS), 0) // classidx -> idx of representant

  let classidx = 0
  const cc = new CubieCube();
  let ss: CubieCube;
  let cpNew: number;
  for (let cp = 0; cp < D.N_CORNERS; cp++) {
    cc.setCorners(cp)
    if ((cp + 1) % 8000 === 0)
      process.stdout.write(".");
    
    if (cornerClassIdx[cp] === INVALID) {
      cornerClassIdx[cp] = classidx
      cornerSym[cp] = 0
      cornerRep[classidx] = cp
    } else {
      continue;
    }

    for (let s = 0; s < D.N_SYM_D4h; s++) {
      ss = new CubieCube(symCube[invIdx[s]].cornersPermutation, symCube[invIdx[s]].cornersOrientation, symCube[invIdx[s]].edgesPermutation, symCube[invIdx[s]].edgesOrientation);
      ss.cornerMultiply(cc)
      ss.cornerMultiply(symCube[s]) // s^-1*cc*s
      cpNew = ss.getCorners();
      if (cornerClassIdx[cpNew] === INVALID) {
        cornerClassIdx[cpNew] = classidx;
        cornerSym[cpNew] = s;
      }
    }
    classidx++;
  }
  process.stdout.write("\n");

  let data = cornerClassIdx;
  // console.log(`write in: ${FILE_DIR_TABLE}/${FILE_CORNER_CLASS_IDX}`);
  fs.writeFileSync(`${FILE_DIR_TABLE}/${FILE_CORNER_CLASS_IDX}`, JSON.stringify(cornerClassIdx));
  // console.log("data", cornerClassIdx);
  

  data = cornerSym;
  // console.log(`write in: ${FILE_DIR_TABLE}/${FILE_cornerSym}`);
  fs.writeFileSync(`${FILE_DIR_TABLE}/${FILE_cornerSym}`, JSON.stringify(cornerSym));
  // console.log("data", cornerSym);
  
  
  data = cornerRep;
  // console.log(`write in: ${FILE_DIR_TABLE}/${FILE_cornerRep}`);
  fs.writeFileSync(`${FILE_DIR_TABLE}/${FILE_cornerRep}`, JSON.stringify(cornerRep));
  // console.log("data", cornerRep);
} else {
  console.log("[INFO] Loading corner sym-tables...");

  let jsonstr: string;
  jsonstr = fs.readFileSync(`${FILE_DIR_TABLE}/${FILE_CORNER_CLASS_IDX}`, 'utf8');
  const cornerClassIdx: Array<number> = JSON.parse(jsonstr);
  // console.log("data", cornerClassIdx);

  jsonstr = fs.readFileSync(`${FILE_DIR_TABLE}/${FILE_cornerSym}`, 'utf8');
  const cornerSym: Array<number> = JSON.parse(jsonstr);
  // console.log("data", cornerSym);

  jsonstr = fs.readFileSync(`${FILE_DIR_TABLE}/${FILE_cornerRep}`, 'utf8');
  const cornerRep: Array<number> = JSON.parse(jsonstr);
  // console.log("data", cornerRep);

}