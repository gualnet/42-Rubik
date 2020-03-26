import React from 'react';
import * as BABYLON from 'babylonjs';
import Scene from './Scene'; // import the component above linking to file we just created.
import Cubie from './Cubie';
import Rubiks from './Rubiks'

export default class Viewer extends React.Component {
  onSceneMount = (e) => {
    const { canvas, scene, engine } = e;

    // Create a camera allways pointing on the center of the scene
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(5, 10, 10));
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 10, 0), scene);
    const light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, -10, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // const cube = new Cubie(scene);
    const rubiks = new Rubiks(scene);

    engine.runRenderLoop(async () => {
      if (scene) {
        scene.render();
      }
    });
  }

  render() {
    return (
      <div className="ctn-viewer">
        <Scene onSceneMount={this.onSceneMount} />
      </div>
    );
  }
}