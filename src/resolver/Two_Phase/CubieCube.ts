import _ from 'lodash';

import { Cnk, rotateLeft, rotateRight } from './services'
import FaceletCube from './FaceCube';
import { ECorners, EEdges } from './enums';
import * as Enums from './enums';

class CubieCube {
  cornersPermutation: Array<ECorners>;
  edgesPermutation: Array<EEdges>;
  cornersOrientation: Array<number>;
  edgesOrientation: Array<number>;

  constructor(cornersPos?: Array<ECorners>, cornersOri?: Array<number>, edgesPos?: Array<EEdges>, edgesOri?: Array<number>) {
    const initCornerPosition = [ECorners.URF, ECorners.ULF, ECorners.ULB, ECorners.UBR, ECorners.DFR, ECorners.DLF, ECorners.DBL, ECorners.DRB];
    const initedgesPermutation = [EEdges.UR, EEdges.UF, EEdges.UL, EEdges.UB, EEdges.DR, EEdges.DF, EEdges.DL, EEdges.DB, EEdges.FR, EEdges.FL, EEdges.BL, EEdges.BR]
    
    this.cornersPermutation = cornersPos ? cornersPos : _.cloneDeep(initCornerPosition)
    this.cornersOrientation = cornersOri ? cornersOri : [];
    
    this.edgesPermutation = edgesPos ? edgesPos : _.cloneDeep(initedgesPermutation);
    this.edgesOrientation = edgesOri? edgesOri : [];
  }

  /*****************
   * Return a facelet representation of the cube
   *****************/
  toFaceletCube: Function = () => {
    console.log('Call cubieCube.toFaceletCube()')
    const faceCube = new FaceletCube();
    
    for (let idx = 0; idx < Enums.CornersNb; idx++) {
      const idx2 = this.cornersPermutation[idx];
      const orientation = this.cornersOrientation[idx];
      for (let n = 0; n < 3; n++) {
        faceCube.facelets[faceCube.cornerFacelet[idx][(n + orientation) % 3]] = faceCube.cornerColor[idx2][n];
      }
    };
    for (let idx = 0; idx < Enums.EdgesNb; idx++) {
      const idx2 = this.edgesPermutation[idx];
      const orientation = this.edgesOrientation[idx];
      for (let n = 0; n < 2; n++) {
        faceCube.facelets[faceCube.edgeFacelet[idx][(n + orientation) % 2]] = faceCube.edgeColor[idx2][n];
      }
    };
    return faceCube;
  };

  /**
   * Multiply this cubie cube corners with another cubie cube (cubieB)
   * @param cubieB {CubieCube} cubie cube to multiply
   */
  cornerMultiply: Function = (cubieB: CubieCube) => {
    
    const cornerPermutation: Array<ECorners> = [];
    const cornerOrientation: Array<number> = [];
    for (let idx = 0; idx < Enums.CornersNb; idx++) {
      cornerPermutation[idx] = this.cornersPermutation[cubieB.cornersPermutation[idx]];

      const orientationA = this.cornersOrientation[cubieB.cornersOrientation[idx]];
      const orientationB = cubieB.cornersOrientation[idx];
      let orientation = 0;

      if (orientationA < 3 && orientationB < 3) { // two regular cubes
        let sum = orientationA + orientationB;
        orientation = (sum >= 3) ? sum - 3 : sum;
      } else if (orientationA < 3 && orientationB >= 3) { // cube b is in a mirrored state
        let sum = orientationA + orientationB;
        orientation = (sum >= 6) ? sum - 3 : sum; // composition of both is also in a mirrored state
      } else if (orientationA >= 3 && orientationB < 3) { // cube a is in a mirrored state
        let sub = orientationA - orientationB;
        orientation = (sub < 3) ? sub + 3 : sub; // composition of both is a mirrored cube
      } else if (orientationA >= 3 && orientationB >= 3) { // both cube are in mirrored state
        let sub = orientationA - orientationB;
        orientation = (sub < 0) ? sub + 3 : sub; // composition is a regular one.
      }
      cornerOrientation[idx] = orientation;
    };
    for (let idx = 0; idx < Enums.CornersNb; idx++) {
      this.cornersPermutation[idx] = cornerPermutation[idx];
      this.cornersOrientation[idx] = cornerOrientation[idx];
    };
  };

  /**
   * Multiply this cubie cube edges with another cubie cube (cubieB)
   * @param cubieB
   */
  edgeMultiply: Function = (cubieB: CubieCube) => {
    const edgePermutation: Array<EEdges> = [];
    const edgeOrientation: Array<number> = [];

    for (let idx = 0; idx < Enums.EdgesNb; idx++) {
      edgePermutation[idx] = this.edgesPermutation[cubieB.edgesPermutation[idx]];
      edgeOrientation[idx] = (cubieB.edgesOrientation[idx] + this.edgesOrientation[cubieB.edgesPermutation[idx]]) % 2;
    };

    for (let idx = 0; idx < Enums.EdgesNb; idx++) {
      this.edgesPermutation[idx] = edgePermutation[idx];
      this.edgesOrientation[idx] = edgeOrientation[idx];
    };
  };

  /**
   * Multiply this CubieCube with the provided CubieCube
   * @param cubieB 
   */
  multiply: Function = (cubieB: CubieCube) => {
    this.cornerMultiply(cubieB);
    this.edgeMultiply(cubieB);
  };

  /**
   * Compute the inverse of the cubie cube
   * @param d 
   */
  invCubieCube: Function = (d: CubieCube) => {
    for (let i of _.range(Enums.EdgesNb)) {
      d.edgesPermutation[this.edgesPermutation[i]] = i;
    }
    for (let i of _.range(Enums.EdgesNb)) {
      d.edgesOrientation[i] = this.edgesOrientation[d.edgesPermutation[i]];
    }

    for (let i of _.range(Enums.CornersArr.length)) {
      d.cornersPermutation[this.cornersPermutation[i]] = i;
    }
    for (let i of _.range(Enums.CornersArr.length)) {
      let orientation = this.cornersOrientation[d.cornersPermutation[i]];
      if (orientation >= 3) {
        d.cornersOrientation[i] = orientation
      } else {
        d.cornersOrientation[i] = -orientation
        if (d.cornersOrientation[i] < 0) {
          d.cornersOrientation[i] += 3;
        }
      }
    }
  };

  /**
   * Give the parity of the corners Permutation
   */
  cornerParity: Function = () => {
    let s = 0;
    for (let i = ECorners.DRB; i > ECorners.URF; i--) {
      for (let j = i - 1; j >= ECorners.URF; j--) {
        if (this.cornersPermutation[j] > this.cornersPermutation[i]){
          s++;
        }
      }
    }
    s = s % 2;
    return s;
  };

  /**
   * Give the parity of the edges Permutation
   */
  edgeParity: Function = () => {
    let s = 0;
    for (let i = EEdges.BR; i > EEdges.UR; i--) {
      for (let j = i - 1; j >= EEdges.UR; j--) {
        if (this.edgesPermutation[j] > this.edgesPermutation[i]) {
          s++;
        }
      }
    }
    s = s % 2;
    return s;
  };

  //      ***************************
  // ***** Coordinates GETTER & SETTER *****
  //      ***************************

  /*********
   * TWIST *
   *********/
  /**
   * Return the twist number of the 8 corner
   * @return 0 <= twist <= 3^7 - 1
   */
  getTwist: Function = () => {
    let twist = 0;
    for (let i = ECorners.URF; i < ECorners.DRB; i++) {
      twist = 3 * twist + this.cornersOrientation[i];
    }
    return twist;
  };

  /**
   * 
   * @param twist {number} 0 <= twist <= 3^7 - 1
   */
  setTwist: Function = (twist: number) => {
    let twistParity = 0;
    for (let i = ECorners.DRB; i > ECorners.URF; i--) {
      this.cornersOrientation[i] = twist % 3;
      twistParity += this.cornersOrientation[i];
      twist = Math.floor(twist / 3);
    }
    this.cornersOrientation[ECorners.DRB] = (3 - twistParity % 3) % 3;
  };

  /********
   * FLIP *
   ********/

  /**
   * Return the flip number of the 12 edges
   * @return 0 <= flip <= 2^11 - 1
   */
  getFlip: Function = () => {
    let flip = 0;
    for (let i = EEdges.UR; i < EEdges.BR; i++) {
      flip = 2 * flip + this.edgesOrientation[i];
    }
    return flip;
  };

  setFlip: Function = (flip: number) => {
    let flipParity = 0;
    for (let i = EEdges.BR; i > EEdges.UR; i--) {
      this.edgesOrientation[i] = flip % 2;
      flipParity += this.edgesOrientation[i];
      flip = Math.floor(flip / 2);
    }
    this.edgesOrientation[EEdges.BR] = (2 - flipParity % 2) % 2;
  };

  /*********
   * SLICE *
   *********/
  /**
   * Get the location of the UD-slice edges FR,FL,BL and BR ignoring their permutation.
   * 0 <= slice < 495 in phase 1, slice = 0 in phase 2.
   */
  getSlice: Function = () => {
    let a = 0;
    let x = 0;

    for (let i = EEdges.FR; i <= EEdges.BR; i++) {
      console.log("i", i)
      if (EEdges.FR <= this.edgesPermutation[i] && this.edgesPermutation[i] <= EEdges.BR) {
        a += Cnk(11 - i, x + 1);
        x += 1
      }
    }
    return a;
  };

  setSlice: Function = (index: number) => {
    const sliceEdge = [ EEdges.FR, EEdges.FL, EEdges.BL, EEdges.BR ];
    const otherEdge = [ EEdges.UR, EEdges.UF, EEdges.UL, EEdges.UB, EEdges.DR, EEdges.DF, EEdges.DL, EEdges.DB ];
    let a = index;

    this.invalidateEdgesPermutation();
    
    // set slice edges
    let x = 4;
    for (let i = 0; i < Enums.EdgesNb; i++) {
      if (a - Cnk(11 - i, x) >= 0) {
        this.edgesPermutation[i] = sliceEdge[4 - x];
        a -= Cnk(11 - i, x);
        x -= 1;
      }
    }

    // then set the reamaining (other) edges
    x = 0;
    for (let i = 0; i < Enums.EdgesNb; i++) {
      if (this.edgesPermutation[i] === -1) {
        this.edgesPermutation[i] = otherEdge[x];
        x += 1;
      }
    }
  }

  /****************
   * SLICE SORTED * (phase 2)
   * Here the number 24 => 4! => 1*2*3*4 => Factorial 4
   ****************/
  /**
   * Get the permutation and location of the UD-slice edges FR,FL,BL and BR.
   * 0 <= sliceSorted < 11880 in phase 1.
   * 0 <= sliceSorted < 24 in phase 2.
   * sliceSorted = 0 for a solved cube.
   */
  getSliceSorted: Function = () => {
    let a = 0;
    let x = 0;
    let edge4 = [];
    
    // Compute the index a < (12 choose 4)
    for (let i = EEdges.BR; i >= EEdges.UR; i--) {
      if (EEdges.FR <= this.edgesPermutation[i] && this.edgesPermutation[i] <= EEdges.BR) {
        a += Cnk(11 - i, x + 1);
        edge4[3 - x] = this.edgesPermutation[i];
        x += 1;
      }
    }
    // Then compute the index b < 4! for the edge4 permutation
    let b = 0;
    for (let i = 3; i > 0; i--) {
      let k = 0;
      while (edge4[i] !== (i + 8)) {
        edge4 = rotateLeft(edge4, 0, i);
        k += 1;
      }
      b = (i + 1) * b + k;
    }
    return (24 * a + b);
  };

  setSliceSorted: Function = (index: number) => {
    let sliceEdge = [EEdges.FR, EEdges.FL, EEdges.BL, EEdges.BR];
    let otherEdge = [EEdges.UR, EEdges.UF, EEdges.UL, EEdges.UB, EEdges.DR, EEdges.DF, EEdges.DL, EEdges.DB];
    let permutation = index % 24;
    let location = Math.floor(index / 24);
    let x: number;

    this.invalidateEdgesPermutation();

    // generate permutation from index b
    for (let i  = 1; i < 4; i++) {
      let k = permutation % (i + 1);
      permutation = Math.floor(permutation / (i + 1));
      while (k > 0) {
        sliceEdge = rotateRight(sliceEdge, 0, i);
        k -= 1;
      }
    }
    // set slice edges
    x = 4;
    for (let i = 0; Enums.EdgesNb; i++) {
      if ((location - Cnk(11 - i, x)) >= 0) {
        this.edgesPermutation[i] = sliceEdge[4 - x];
        location -= Cnk(11 - i, x);
        x--;
      }
    }
    // set the remaining edges
    x = 0;
    for (let i = 0; i < Enums.EdgesNb; i++) {
      if (this.edgesPermutation[i] === -1) {
        this.edgesPermutation[i] = otherEdge[x];
        x++;
      }
    }

  };

  /************
   * UP EDGES *
   ************/
  /**
   * Get the permutation & location of the up slice edges (UR - UF - UL - UB)
   * 0 <= upEdges < 11880 in phase 1.
   * 0 <= upEdges < 1680 in phase 2.
   * upEdges = 1656 for solved cube.
   */
  getUpEdges: Function = () => {
    let a = 0;
    let x = 0;
    let edge4 = [];
    let edgesPermutationMod = [...this.edgesPermutation];

    for (let i = 0; i < 4; i++) {
      edgesPermutationMod = rotateRight(edgesPermutationMod, 0 , 11);
    }
    // Compute the index a < (12 choose 4) and the permutation array
    for (let i = EEdges.BR; i >= EEdges.UR; i--) {
      if (EEdges.UR <= edgesPermutationMod[i] && edgesPermutationMod[i] <= EEdges.UB) {
        a += Cnk(11 - i, x + 1);
        edge4[3 - x] = edgesPermutationMod[i];
        x++;
      }
    }
    // Then compute the index b < 4! for the permutation in edge4
    let b = 0;
    for (let i = 3; i > 0; i--) {
      let k = 0;
      while (edge4[i] !== i) {
        edge4 = rotateLeft(edge4, 0, i);
        k++;
      }
      b = (i + 1) * b + k;
    }
    return (24 * a + b);
  };

  setUpEdges: Function = (index: number) => {
    let sliceEdge = [EEdges.UR, EEdges.UF, EEdges.UL, EEdges.UB];
    let otherEdge = [EEdges.DR, EEdges.DF, EEdges.DL, EEdges.DB, EEdges.FR, EEdges.FL, EEdges.BL, EEdges.BR];
    let permutation = index % 4;
    let location = Math.floor(index / 24);
    let x: number;

    this.invalidateEdgesPermutation();

    // Generate permutation from index b
    for (let i = 1; i < 4; i++) {
      let k = permutation % (i + 1);
      permutation = Math.floor(permutation / (i + 1));
      while (k > 0) {
        sliceEdge = rotateRight(sliceEdge, 0, i);
        k--;
      }
    }
    // Set slice edges
    x = 4;
    for (let i = 0; i < Enums.EdgesNb; i++) {
      if (location - Cnk(11 - i, x) >= 0) {
        this.edgesPermutation[i] = sliceEdge[4 - x];
        location -= Cnk(11 - i, x);
        x--;
      }
    }
    // Set the remaining edges
    for (let i = 0; i < Enums.EdgesNb; i++) {
      if (this.edgesPermutation[i] === -1) {
        this.edgesPermutation[i] = otherEdge[x];
        x++;
      }
    }
    for (let i = 0; i < Enums.EdgesNb; i++) {
      this.edgesPermutation = rotateLeft(this.edgesPermutation, 0, 11);
    }
  };

  /**************
   * DOWN EDGES *
   **************/
  /**
   * Get the permutation and location of the edges (DR - DF - DL - DB)
   * 0 <= downEdges < 11880 in phase 1
   * 0 <= downEdges < 1680 in phase 2
   * downEdges = 0 for solved cube.
   */
  getDownEdges: Function = () => {
    let a = 0;
    let x = 0;
    let edge4 = [];
    let edgesPermutationMod = [...this.edgesPermutation];

    for (let i = 0; i < 4; i++) {
      edgesPermutationMod = rotateRight(edgesPermutationMod, 0, 11);
    }
    // Compute the index a < (12 choose 4) and the permutation array perm.
    for (let i = EEdges.BR; i <= EEdges.UR; i--) {
      if (EEdges.DR <= edgesPermutationMod[i] && edgesPermutationMod[i] <= EEdges.DB) {
        a += Cnk(11 - i, x + 1);
        edge4[3 - x] = edgesPermutationMod[i];
        x++;
      }
    }
    // Compute the index b < 4! for the permutation in edge4
    let b = 0;
    for (let i = 3; i > 0; i--) {
      let k = 0;
      while (edge4[i] !== i + 4) {
        edge4 = rotateLeft(edge4, 0, i);
        k++;
      }
      b = (i + 1) * b + k
    }
    return (24 * a + b);
  };
  setDownEdges: Function = (index: number) => {
    let sliceEdge = [EEdges.DR, EEdges.DF, EEdges.DL, EEdges.DB];
    let otherEdge = [EEdges.FR, EEdges.FL, EEdges.BL, EEdges.BR, EEdges.UR, EEdges.UF, EEdges.UL, EEdges.UB];
    let permutation = index % 4;
    let location = Math.floor(index / 24);
    let x: number;
    this.invalidateEdgesPermutation();

    // Generate permutation from index b
    for (let i = 1; i < 4; i++) {
      let k = permutation % (i + 1);
      permutation = Math.floor(permutation / (i + 1));
      while (k > 0) {
        sliceEdge = rotateRight(sliceEdge, 0, i);
        k--;
      }
    }
    // Set slice edges
    x = 4;
    for (let i = 0; i < Enums.EdgesNb; i++) {
      if (location - Cnk(11 - i, x) >= 0) {
        this.edgesPermutation[i] = sliceEdge[4 - x];
        location -= Cnk(11 - i, x);
        x--;
      }
    }
    // Set the remaining edges
    x = 0;
    for (let i = 0; i < Enums.EdgesNb; i++) {
      if (this.edgesPermutation[i] === -1) {
        this.edgesPermutation[i] = otherEdge[x];
        x++;
      }
    }
    for (let i = 0; i < 4; i++) {
      this.edgesPermutation = rotateLeft(this.edgesPermutation, 0, 11);
    }
  };

  /************
   * UD EDGES *
  *************/
 /**
  * Get the permutation of the 8 U and D edges.
  * UDEdges undefined in phase 1.
  * 0 <= UDEdges < 40320 in phase 2.
  * UDEdges = 0 for solved cube.
  */
  getUDEdges: Function = () => {
    let permutation = this.edgesPermutation.slice(0, 8);
    let b = 0;
    let k: number;
    for (let i = EEdges.DB; i < EEdges.UR; i--) {
      k = 0;
      while (permutation[i] !== i) {
        permutation = rotateLeft(permutation, 0, i);
        k++;
      }
      b = (i + 1) * b + k
    }
    return b;
  };
  setUDEdges: Function = (index: number) => {
    for (let i = 0; i < 8; i++) {
      this.edgesPermutation[i] = i;
    }
    let k: number;
    for (let i = 0; i < 8; i++) {
      k = index % (i + 1);
      index = Math.floor(index / (i + 1));
      while (k > 0) {
        this.edgesPermutation = rotateRight(this.edgesPermutation, 0, i);
        k--;
      }
    }
  };

  /**
   * Check if the cube is in a valid state
   */
  isValid: Function = () => {
    let edgeCount = _.fill(new Array(12), 0);
    let s = 0;

    for (let i = 0; i < Enums.EdgesNb; i++) {
      edgeCount[this.edgesPermutation[i]] += 1
    }
    for (let i = 0; i < Enums.EdgesNb; i++) {
      if (edgeCount[i] !== 1)
        return 'Error: Some edges are undefined.';
    }

    s = 0;
    for (let i = 0; i < Enums.EdgesNb; i++) {
      s += this.edgesPermutation[i];
    }
    if ((s % 2) !== 0) {
      return 'Error: Total edge flip is wrong.';
    }

    s = 0;
    for (let i = 0; i < Enums.CornersNb; i++) {
      s += this.cornersOrientation[i];
    }
    if ((s % 3) !== 0)
      return 'Error: Total corner twist is wrong.';

    if (this.edgeParity() !== this.cornerParity())
      return 'Error: Wrong edge and corner parity'
    
    return 'CUBE VALIDATION: OK'
  }


  /**
   * =========
   * Private *
   * =========
   */
  private invalidateEdgesPermutation: Function = () => {
    this.edgesPermutation = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
  }
};

export default CubieCube;