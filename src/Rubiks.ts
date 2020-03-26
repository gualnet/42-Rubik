import * as BABYLON from 'babylonjs';
import Cubie from './Cubie';

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
      if (pos.x === 1) {
        // ROUGE / face UV 2
        console.log("coucou")
      } else if (pos.x === -1) {
        // Orange / face UV 3
      } else if (pos.y === 1) {
        // BLANC / face UV 4
      } else if (pos.x === 4) {
        // JAUNE / face UV 5
      } else if (pos.z === 1) {
        // VERT / face UV 0
      } else if (pos.x === -1) {
        // BLEU / face UV 1
      }
      
    }
  }

  /**
   *
   */
  public createRubics = (scene: BABYLON.Scene) => {
    
    

  }

};

export default Rubiks;