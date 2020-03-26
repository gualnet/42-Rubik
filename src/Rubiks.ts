import * as BABYLON from 'babylonjs';
import Cubie from './Cubie';

enum ROTATE {
  'U',// UP
  'D',// DOWN
  'L',// LEFT
  'R',// RIGHT
  'F',// FRONT
  'B',// BACK
}

const faceColors = [
  new BABYLON.Vector4(0, 0, 1, 0),
  new BABYLON.Vector4(1, 0, 0, 0),
]

class Rubiks {
  private cubies: Array<Cubie>;

  constructor(scene: BABYLON.Scene) {
    this.cubies = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          if (i == 0 && j == 0 && k == 0) {
            //do nothing
          } else {
            this.cubies.push(new Cubie(scene, new BABYLON.Vector3( i, j, k)))
          }
        }
      }
    }

    for (const cubie of this.cubies) {
      let pos = cubie.getPosition();
      
      
    }
  }

  /**
   *
   */
  public rotate = (type: ROTATE) => {
    
    

  }

};

export default Rubiks;