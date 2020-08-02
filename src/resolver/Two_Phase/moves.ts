import fs from 'fs';
import _ from 'lodash';

import CubieCube from './CubieCube';
import D from './defines';
import { EColors } from './enums'

/********************************************
 * Move table for the twists of the corners *
 ********************************************/
const FILE_DIR_TABLE = './tables'
const FILE_MOVE_TWIST = "move_twist.rbk";
export let twistMove: Array<number>;
const cc = new CubieCube();
if (!fs.existsSync(`${FILE_DIR_TABLE}/${FILE_MOVE_TWIST}`)) {
  console.log(`creating ${FILE_MOVE_TWIST} table...`);
  const twistMove = _.fill(new Array(D.N_TWIST * D.N_MOVE), 0);

  let basicMove: CubieCube | undefined;
  for (let i = 0; i < D.N_TWIST; i++) {
    cc.setTwist(i);
    for (let j = 0; j < D.NB_COLORS; j++) {
      for (let k = 0; k < 3; k++) {
        basicMove = CubieCube.basicMoveCube(j);
        if (!basicMove) throw(new Error('[ERROR] move - basic move value: undefined.'));
        cc.cornerMultiply(basicMove);
        twistMove[D.N_MOVE * i * j * k] = cc.getTwist();
      }
      basicMove = CubieCube.basicMoveCube(j);
      if (!basicMove) throw(new Error('[ERROR] move - basic move value: undefined.'));
      cc.cornerMultiply(basicMove);
    }
  }
  const str = twistMove.toString()
  fs.writeFileSync(`${FILE_DIR_TABLE}/${FILE_MOVE_TWIST}`, str);
} else {
  console.log(`Loading ${FILE_MOVE_TWIST} tables...`);

  const strFromFile = fs.readFileSync(`${FILE_DIR_TABLE}/${FILE_MOVE_TWIST}`, 'utf8');
  const arrStr = Array.from(strFromFile);
  arrStr.map((val, idx) => {
    let number = Number(val);
    if (Number.isNaN(number)) {
      throw(new Error('[ERROR] moves: Twist Move from file error'))
    } else {
      twistMove[idx] = number;
    }
  })
};


/****************************************
 * Move table for the flip of the edges *
 ****************************************/

const FILE_MOVE_FLIP = "move_flip.rbk";
export let flipMove: Array<number>;
let basicMove: CubieCube | undefined;
if (!fs.existsSync(`${FILE_DIR_TABLE}/${FILE_MOVE_FLIP}`)) {
  console.log(`Creating ${FILE_MOVE_FLIP} table...`);
  flipMove = _.fill(new Array(D.N_FLIP * D.N_MOVE), 0);
  for (let i = 0; i < D.N_FLIP; i++) {
    cc.setFlip(i);
    for (let j = 0; j < D.NB_COLORS; j++) {
      for (let k = 0; k < 3; k++) {
        basicMove = CubieCube.basicMoveCube(j);
        if (!basicMove) throw(new Error('[ERROR] move - basic move value: undefined.'));
        cc.edgeMultiply(basicMove)
        flipMove[D.N_MOVE * i + 3 * j + k] = cc.getFlip();
      }
      basicMove = CubieCube.basicMoveCube(j);
      if (!basicMove) throw(new Error('[ERROR] move - basic move value: undefined.'));
      cc.edgeMultiply(basicMove);
    }
  }
  const str = JSON.stringify(flipMove);
  fs.writeFileSync(`${FILE_DIR_TABLE}/${FILE_MOVE_FLIP}`, str);
} else {
  console.log(`Loading ${FILE_MOVE_FLIP} tables...`);
  flipMove = JSON.parse(require(`${FILE_DIR_TABLE}/${FILE_MOVE_FLIP}`));
};

/************************************************************
 * Move table for the four UD-slice edges FR, FL, Bl and BR *
 ************************************************************/
const FILE_SLICE_SORTED = 'move_slice_sorted.rbk';
export let sliceSortedMove: Array<number>;
// let basicMove: CubieCube | undefined;
if (!fs.existsSync(`${FILE_DIR_TABLE}/${FILE_SLICE_SORTED}`)) {
  console.log(`Creating ${FILE_SLICE_SORTED} table...`);

  sliceSortedMove = _.fill(new Array(D.N_SLICE_SORTED * D.N_MOVE), 0);
  for (let i = 0; i < D.N_SLICE_SORTED; i++) {
    if (i % 200 === 0)
      process.stdout.write(".")
    cc.setSliceSorted(i)
    for (let j = 0; j < D.NB_COLORS; i++) {
      for (let k = 0; k < 3; k++) {
        basicMove = CubieCube.basicMoveCube(j);
        if (!basicMove) throw(new Error('[ERROR] move - basic move value: undefined.'));
        cc.edgeMultiply(basicMove)
        sliceSortedMove[D.N_MOVE * i + 3 * j + k] = cc.getSliceSorted();
      }
      basicMove = CubieCube.basicMoveCube(j);
      if (!basicMove) throw(new Error('[ERROR] move - basic move value: undefined.'));
      cc.edgeMultiply(basicMove);
    }
  }
  const str = JSON.stringify(sliceSortedMove);
  fs.writeFileSync(`${FILE_DIR_TABLE}/${FILE_SLICE_SORTED}`, str);

} else {
  console.log(`Loading ${FILE_SLICE_SORTED} tables...`);
  sliceSortedMove = JSON.parse(require(`${FILE_DIR_TABLE}/${FILE_SLICE_SORTED}`));
};

/***************************************************************************
 * Move table for the u_edges coordinate for transition phase 1 -> phase 2 *
 ***************************************************************************/
const FILE_U_EDGES = 'move_u_edges.rbk';
export let uEdgesMove: Array<number>;
if (!fs.existsSync(`${FILE_DIR_TABLE}/${FILE_U_EDGES}`)) {
  console.log(`Creating ${FILE_U_EDGES} table...`);
  uEdgesMove = _.fill(new Array(D.N_SLICE_SORTED * D.N_MOVE), 0)

  for (let i = 0; i < D.N_SLICE_SORTED; i++) {
    if (i % 20 === 0)
      process.stdout.write(".");
    cc.setUpEdges(i);
    for (let j = 0; i < D.NB_COLORS; j++) {
      for (let k = 0; k < 3; k++) {
        basicMove = CubieCube.basicMoveCube(j);
        if (!basicMove) throw(new Error('[ERROR] move - basic move value: undefined.'));
        cc.edgeMultiply(basicMove);
        uEdgesMove[D.N_MOVE * i + 3 * j + k] = cc.getUpEdges();
      }
      basicMove = CubieCube.basicMoveCube(j);
      if (!basicMove) throw(new Error('[ERROR] move - basic move value: undefined.'));
      cc.edgeMultiply(basicMove);
    }
  }
  // To file
  fs.writeFileSync(`${FILE_DIR_TABLE}/${FILE_U_EDGES}`, JSON.stringify(uEdgesMove));
} else {
  console.log(`Loading ${FILE_U_EDGES} tables...`);
  uEdgesMove = JSON.parse(require(`${FILE_DIR_TABLE}/${FILE_U_EDGES}`));
};

/***************************************************************************
 * Move table for the d_edges coordinate for transition phase 1 -> phase 2 *
 ***************************************************************************/
const FILE_D_EDGES = 'move_d_edges.rbk';
export let dEdgesMove: Array<number>;
if (!fs.existsSync(`${FILE_DIR_TABLE}/${FILE_D_EDGES}`)) {
  console.log(`Creating ${FILE_D_EDGES} table...`);
  dEdgesMove = _.fill(new Array(D.N_SLICE_SORTED * D.N_MOVE), 0)
  for (let i = 0; i < D.N_SLICE_SORTED; i++) {
    if (i % 20 === 0)
      process.stdout.write('.');
    cc.setDownEdges(i);
    for (let j = 0; j < D.NB_COLORS; j++) {
      for (let k = 0; k < 3; k++) {
        basicMove = CubieCube.basicMoveCube(j);
        if (!basicMove) throw(new Error('[ERROR] move - basic move value: undefined.'));
        cc.edgeMultiply(basicMove);
        dEdgesMove[D.N_MOVE * i + 3 * j + k] = cc.getDownEdges();
      }
      basicMove = CubieCube.basicMoveCube(j);
      if (!basicMove) throw(new Error('[ERROR] move - basic move value: undefined.'));
      cc.edgeMultiply(basicMove);
    }
  }
  // to file
  fs.writeFileSync(`${FILE_DIR_TABLE}/${FILE_D_EDGES}`, JSON.stringify(uEdgesMove));
} else {
  console.log(`Loading ${FILE_D_EDGES} tables...`);
  uEdgesMove = JSON.parse(require(`${FILE_DIR_TABLE}/${FILE_D_EDGES}`));
};

/*****************************************************
 * Move table for the edges in the U-face and D-face *
 *****************************************************/
const FILE_UD_EDGES = 'move_ud_edges.rbk';
export let udEdgesMove: Array<number>;
if (!fs.existsSync(`${FILE_DIR_TABLE}/${FILE_UD_EDGES}`)) {
  console.log(`Creating ${FILE_UD_EDGES} table...`);
  udEdgesMove = _.fill(new Array(D.N_UD_EDGES * D.N_MOVE), 0)
  for (let i = 0; i < D.N_UD_EDGES; i++) {
    if ((i + 1) % 600 === 0)
      process.stdout.write('.');
    if ((i+1) % 48000 === 0)
      process.stdout.write('\n');
    cc.setUDEdges(i);
    for (let j = 0; j < D.NB_COLORS; j++) {
      for (let k = 0; k < 3; k++) {
        basicMove = CubieCube.basicMoveCube(j);
        if (!basicMove) throw(new Error('[ERROR] move - basic move value: undefined.'));
        cc.edgeMultiply(basicMove);
        if ([EColors.R, EColors.F, EColors.L, EColors.B].includes(j) && k !== 1)
          continue;
        udEdgesMove[D.N_MOVE * i + 3 * j + k] = cc.getUDEdges();
      }
      basicMove = CubieCube.basicMoveCube(j);
      if (!basicMove) throw(new Error('[ERROR] move - basic move value: undefined.'));
      cc.edgeMultiply(basicMove);
    }
  }
  // to file
  fs.writeFileSync(`${FILE_DIR_TABLE}/${FILE_UD_EDGES}`, JSON.stringify(uEdgesMove));
} else {
  console.log(`Loading ${FILE_UD_EDGES} tables...`);
  udEdgesMove = JSON.parse(require(`${FILE_DIR_TABLE}/${FILE_UD_EDGES}`));
};

/****************************************************
 * Move table for the corners coordinate in phase 2 *
 ****************************************************/
const FILE_CORNERS_MOVE = 'move_corners.rbk';
export let cornersMove: Array<number>;
if (!fs.existsSync(`${FILE_DIR_TABLE}/${FILE_CORNERS_MOVE}`)) {
  console.log(`Creating ${FILE_CORNERS_MOVE} table...`);
  cornersMove = _.fill(new Array(D.N_CORNERS * D.N_MOVE), 0)
  for (let i = 0; i < D.N_CORNERS; i++) {
    if ((i + 1) % 200 === 0)
      process.stdout.write('.');
    if ((i+1) % 16000 === 0)
      process.stdout.write('\n');
    cc.setCorners(i);
    for (let j = 0; j < D.NB_COLORS; j++) {
      for (let k = 0; k < 3; k++) {
        basicMove = CubieCube.basicMoveCube(j);
        if (!basicMove) throw(new Error('[ERROR] move - basic move value: undefined.'));
        cc.edgeMultiply(basicMove);
        cornersMove[D.N_MOVE * i + 3 * j + k] = cc.getCorners();
      }
      basicMove = CubieCube.basicMoveCube(j);
      if (!basicMove) throw(new Error('[ERROR] move - basic move value: undefined.'));
      cc.edgeMultiply(basicMove);
    }
  }
  // to file
  fs.writeFileSync(`${FILE_DIR_TABLE}/${FILE_CORNERS_MOVE}`, JSON.stringify(cornersMove));
} else {
  console.log(`Loading ${FILE_CORNERS_MOVE} tables...`);
  cornersMove = JSON.parse(require(`${FILE_DIR_TABLE}/${FILE_CORNERS_MOVE}`));
};