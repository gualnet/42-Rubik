import CubieCube from "./CubieCube";
import * as symmetry from './symmetries'
import D from './defines';


const SOLVED = 0;


/******************************
 * Cube on a Coordinate Level *
 ******************************
 * In phase 1 a state is uniquely determined by the three coordinates flip, twist and slice.
 * In phase 2 a state is uniquely determined by the three coordinates corners, ud_edges and slice_sorted.
 */
export default class CoordinateCube {
  twist: number;
  flip: number;
  sliceSorted: number;
  upEdges: number;
  downEdges: number;
  corners: number;
  udEdges: number;
  flipsliceClassidx: number = 0;
  flipsliceSym: number = 0;
  flipsliceRep: number = 0;
  cornerClassidx: number = 0;
  cornerSym: number = 0;
  cornerRep: number = 0;

  constructor(cubieCubie?: CubieCube) {
    if (!cubieCubie) {
      this.twist = SOLVED;
      this.flip = SOLVED;
      this.sliceSorted = SOLVED;

      this.upEdges = 1656;
      this.downEdges = SOLVED;
      this.corners = SOLVED;
      this.udEdges = SOLVED;

    } else {
      this.twist = cubieCubie.getTwist();
      this.flip = cubieCubie.getFlip();
      this.sliceSorted = cubieCubie.getSliceSorted(); // phase 1 (<11880) | phase 2 (<24)

      this.upEdges = cubieCubie.getUpEdges();
      this.downEdges = cubieCubie.getDownEdges();
      this.corners = cubieCubie.getCorners();
      this.udEdges = (this.sliceSorted < D.N_PERM_4) ? cubieCubie.getUDEdges() : -1

      // Symmetry reduced flipslice coordinate used in phase 1
      const indice = D.N_FLIP * Math.floor(this.sliceSorted / D.N_PERM_4) + this.flip;
      this.flipsliceClassidx = symmetry.flipsliceClassIdx[indice];
      this.flipsliceSym = symmetry.flipsliceSym[indice];
      this.flipsliceRep = symmetry.flipsliceRep[this.flipsliceClassidx];

      // Symmetry reduced corner permutation coordinate used in phase 2
      this.cornerClassidx = symmetry.cornerClassIdx[this.corners]
      this.cornerSym = symmetry.cornerSym[this.corners]
      this.cornerRep = symmetry.cornerRep[this.cornerClassidx]
    }
  };

  toString = () => {
    let str = `(twist: ${this.twist}, flip: ${this.flip}, slice: ${Math.floor(this.sliceSorted / 24)} 
    U-edges: ${this.upEdges}, D-edges: ${this.downEdges}, E-edges: ${this.sliceSorted}, corners: ${this.corners}, UD_edges: ${this.udEdges})\n`;
    str += `${this.flipsliceClassidx} - ${this.flipsliceSym} - ${this.flipsliceRep}\n`;
    str += `${this.cornerClassidx} - ${this.cornerSym} - ${this.cornerRep}`;
    return str;
  };

  firstPhaseMoves = (m) => {

  };

};