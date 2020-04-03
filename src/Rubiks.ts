import * as BABYLON from '@babylonjs/core';
import Cubie from './Cubie';

// enum ROTATE {
//   'U',// UP     (0,1,0)
//   'D',// DOWN   (0,-1,0)
//   'L',// LEFT   (1,0,0)
//   'R',// RIGHT  (-1,0,0)
//   'F',// FRONT  (0,0,-1)
//   'B',// BACK   (0,0,1)
// }

class Rubiks {
  private _cubies: Array<Cubie>;

  constructor(scene: BABYLON.Scene) {
    this._cubies = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          if (i === 0 && j === 0 && k === 0) {
            //do nothing
          } else {
            this._cubies.push(new Cubie(scene, new BABYLON.Vector3( i, j, k)))
          }
        }
      }
    }
  }

  /**
   * rotate
   */
  public rotate(input: string) {
    const key = input;
    const center = new BABYLON.Vector3(0, 0, 0);
    const axisX = new BABYLON.Vector3(1, 0, 0);
    const axisY = new BABYLON.Vector3(0, 1, 0);
    const axisZ = new BABYLON.Vector3(0, 0, 1);
    let pos;
    for (const cubie of this._cubies) {
      pos = cubie.currentPos;
      switch (key) { // min: clockwise - MAJ: counter-clockwise
        case "u":
          if (pos.y === 1) {
            cubie.rotateAround(center, axisY, Math.PI/2);
            cubie.updateFaces(key)
          }
          break;
        case "U":
          if (pos.y === 1) {
            cubie.rotateAround(center, axisY, -Math.PI/2);
          }
          break;
        case "d":
          if (pos.y === -1) {
            cubie.rotateAround(center, axisY, -Math.PI/2);
          }
          break;
        case "D":
          if (pos.y === -1) {
            cubie.rotateAround(center, axisY, Math.PI/2);
          }
          break;
          
        case "l":
          if (pos.x === -1) {
            cubie.rotateAround(center, axisX, -Math.PI/2);
          }
          break;
        case "L":
          if (pos.x === -1) {
            cubie.rotateAround(center, axisX, Math.PI/2);
          }
          break;
        case "r":
          if (pos.x === 1) {
            cubie.rotateAround(center, axisX, Math.PI/2);
          }
          break;
        case "R":
          if (pos.x === 1) {
            cubie.rotateAround(center, axisX, -Math.PI/2);
          }
          break;
        
        case "f":
          if (pos.z === -1) {
            cubie.rotateAround(center, axisZ, -Math.PI/2);
          }
          break;
        case "F":
          if (pos.z === -1) {
            cubie.rotateAround(center, axisZ, Math.PI/2);
          }
          break;
        case "b":
          if (pos.z === 1) {
            cubie.rotateAround(center, axisZ, Math.PI/2);
          }
          break;
        case "B":
          if (pos.z === 1) {
            cubie.rotateAround(center, axisZ, -Math.PI/2);
          }
          break;
      
        default:
          console.log("Unhandled key", key)
          break;
      } 
    }
  } // end

  /**
   * GETERS / SETTERS
   */  
  get cubies(): Cubie[] { return this._cubies};

};

export default Rubiks;