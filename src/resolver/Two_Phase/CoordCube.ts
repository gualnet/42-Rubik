import CubieCube from "./CubieCube";
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
  flipsliceClassidx: ;
  flipsliceSym: ;
  flipsliceRep: ;

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
      this.flipsliceClassidx
      this.flipsliceSym
      this.flipsliceRep
      // Symmetry reduced corner permutation coordinate used in phase 2
      this.flipsliceClassidx
      this.flipsliceSym
      this.flipsliceRep
      
    }
  }


};