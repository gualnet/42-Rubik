import * as BABYLON from 'babylonjs';
import Cubie from './Cubie';
import { Vector3 } from 'babylonjs';

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
  /**
   * name
   */
  public rotate(input: string) {
    let key = input// ? input.toLowerCase() : null
    const cubie0 = this.cubies[0];

    const center = new BABYLON.Vector3(0, 0, 0);
    const axisX = new BABYLON.Vector3(1, 0, 0);
    const axisY = new BABYLON.Vector3(0, 1, 0);
    let pos;
    for (const cubie of this.cubies) {
      pos = cubie.getPosition();
      console.log("key", key);
      switch (key) {
        case "u":
          if (pos.y === 1) {
            cubie.inner.rotateAround(center, axisY, Math.PI/2);
          }
          break;
        case "U":
          if (pos.y === 1) {
            cubie.inner.rotateAround(center, axisY, -Math.PI/2);
          }
          break;
        case "l":
          if (pos.x === 1) {
            cubie.inner.rotateAround(center, axisX, Math.PI/2);
          }
          break;
        case "L":
          if (pos.x === 1) {
            cubie.inner.rotateAround(center, axisX, -Math.PI/2);
          }
          break;
        
      
        default:
          console.log("")
          break;
      }
      
    }

  }

};

export default Rubiks;