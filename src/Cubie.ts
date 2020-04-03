import * as BABYLON from '@babylonjs/core';

export enum Faces {
  BACK = 0,
  FRONT,
  LEFT,
  RIGHT,
  UP,
  DOWN,
}

class Cubie {
  private object: BABYLON.Mesh;
  // inner: BABYLON.Mesh;
  private _currentPos: BABYLON.Vector3;
  private _originPos: BABYLON.Vector3;
  private _originFaces: Faces[];
  private _currentFaces: Faces[];
  // public faces: string[];


  constructor(scene: BABYLON.Scene, position: BABYLON.Vector3){
    const colors: Array<BABYLON.Color4> = new Array(6).fill(new BABYLON.Color4(0,0,0,1));
    this._originFaces = new Array(6).fill(false);
    this._currentFaces = new Array(6).fill(false);
    // RIGHT / ORANGE / face UV 2
    if (position.x === 1) {
      colors[2] = new BABYLON.Color4(1,0.5,0,1);
      this._currentFaces[Faces.RIGHT] = Faces.RIGHT;
      this._originFaces[Faces.RIGHT] = Faces.RIGHT;
    }
    // LEFT / ROUGE / face UV 3
    if (position.x === -1) {
      colors[3] = new BABYLON.Color4(1,0,0,1);
      this._currentFaces[Faces.LEFT] = Faces.LEFT;
      this._originFaces[Faces.LEFT] = Faces.LEFT;
    }
    // UP / BLANC / face UV 4
    if (position.y === 1) {
      colors[4] = new BABYLON.Color4(1,1,1,1);
      this._currentFaces[Faces.UP] = Faces.UP;
      this._originFaces[Faces.UP] = Faces.UP;
    }
    // DOWN / JAUNE / face UV 5
    if (position.y === -1) {
      colors[5] = new BABYLON.Color4(1, 0.8, 0.1,1);
      this._currentFaces[Faces.DOWN] = Faces.DOWN;
      this._originFaces[Faces.DOWN] = Faces.DOWN;
    }
    // BACK / VERT / face UV 0
    if (position.z === 1) {
      colors[0] = new BABYLON.Color4(0,1,0,1);
      this._currentFaces[Faces.BACK] = Faces.BACK;
      this._originFaces[Faces.BACK] = Faces.BACK;
    }
    // FRONT / BLEU / face UV 1
    if (position.z === -1) {
      colors[1] = new BABYLON.Color4(0,0,1,1);
      this._currentFaces[Faces.FRONT] = Faces.FRONT;
      this._originFaces[Faces.FRONT] = Faces.FRONT;
    }

    this.object = this.createCubie(scene, colors)
    this.object.position = position;
    this._currentPos = this.object.position;
    this._originPos = new BABYLON.Vector3().copyFrom(position);
    // this.inner = this.object;
    
  }

  print() {
    // console.log("pos", this.object.position)
    console.log("_originFaces", this._originFaces)
    console.log("_currentFaces", this._currentFaces)
  }

  updateFaces(move: string) {
    let suite: Faces[] = [];
    if (['u', 'U', 'd','D'].includes(move)) suite = [Faces.BACK, Faces.RIGHT, Faces.FRONT, Faces.LEFT];
    if (['l', 'L', 'r','R'].includes(move)) suite = [Faces.BACK, Faces.RIGHT, Faces.FRONT, Faces.LEFT];
    // if (['u', 'U', 'd','D'].includes(move)) suite = [Faces.BACK, Faces.RIGHT, Faces.FRONT, Faces.LEFT];
    // if (['u', 'U', 'd','D'].includes(move)) suite = [Faces.BACK, Faces.RIGHT, Faces.FRONT, Faces.LEFT];
    // console.log("\n----this._faces", this._originFaces)
    console.log("this._faces", this._currentFaces)

    for (let i in this._currentFaces ) {
      // Get the position in suite tab
      let suitePosition = suite.indexOf(this._currentFaces[i]);
      if (suitePosition > -1) {
        if (move==="u") {
          suitePosition = (suitePosition + 1 > suite.length -1) ? 0 : suitePosition + 1
        } else {
          suitePosition = (suitePosition - 1 < 0) ? suite.length-1 : suitePosition - 1
        }
        this._currentFaces[i] = suite[suitePosition];
      }
      }
    console.log("this._faces", this._currentFaces)

  };

  get currentFaces():Faces[] {return this._currentFaces };
  get originPos():BABYLON.Vector3 { return this._originPos };
  get currentPos():BABYLON.Vector3 { return this._currentPos };
  set currentPos(newPos: BABYLON.Vector3) {
    this.object.position = newPos;
    this._currentPos = newPos;
  };

  rotateAround(point: BABYLON.Vector3, axis: BABYLON.Vector3, amount:number) {
    this.object.rotateAround(point, axis, amount);
    this.currentPos = this.object.position;
  };

  private createCubie(scene: BABYLON.Scene, colors: Array<BABYLON.Color4>) {
    return BABYLON.MeshBuilder.CreateBox('cubie', {
      size: 0.8,
      faceColors: colors,
      updatable: true,
    }, scene);
  }


};

export default Cubie;