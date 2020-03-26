import * as BABYLON from 'babylonjs';


class Cubie {
  private object: BABYLON.Mesh;


  constructor(scene: BABYLON.Scene, position: BABYLON.Vector3){
    const colors: Array<BABYLON.Color4> = new Array(6).fill(new BABYLON.Color4(0,0,0,1));
    // ROUGE / face UV 2
    if (position.x === 1) colors[2] = new BABYLON.Color4(1,0,0,1);
    // Orange / face UV 3
    if (position.x === -1) colors[3] = new BABYLON.Color4(1,0.5,0,1);
    // BLANC / face UV 4
    if (position.y === 1) colors[4] = new BABYLON.Color4(1,1,1,1);
    // JAUNE / face UV 5
    if (position.y === -1) colors[5] = new BABYLON.Color4(1, 0.8, 0.1,1);
    // BLEU / face UV 0
    if (position.z === 1) colors[0] = new BABYLON.Color4(0,0,1,1);
    // VERT / face UV 1
    if (position.z === -1) colors[1] = new BABYLON.Color4(0,1,0,1);

    this.object = this.createCubie(scene, colors)
    this.object.position = position;
    
  }

  getPosition = ():BABYLON.Vector3 => this.object.position;

  private createCubie(scene: BABYLON.Scene, colors: Array<BABYLON.Color4>) {
    return BABYLON.MeshBuilder.CreateBox('cubie', {
      size: 0.8,
      faceColors: colors,
      updatable: true,
    }, scene);
  }


};

export default Cubie;
