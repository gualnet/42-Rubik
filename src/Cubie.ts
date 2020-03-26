import * as BABYLON from 'babylonjs';


class Cubie {
  private object: BABYLON.Mesh;


  constructor(scene: BABYLON.Scene, position: BABYLON.Vector3){
    this.object = BABYLON.MeshBuilder.CreateBox('cubie', {
      size: 0.9,
      updatable: true,
    }, scene);
    this.object.position = position;
  }

  getPosition = ():BABYLON.Vector3 => this.object.position;



};

export default Cubie;
