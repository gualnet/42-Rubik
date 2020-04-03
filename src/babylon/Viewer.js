import React from 'react';
import * as BABYLON from '@babylonjs/core';

import Scene from './Scene'; // import the component above linking to file we just created.
import Rubiks from '../Rubiks'
import {initGUI} from './GUI';


export default class Viewer extends React.Component {
  onSceneMount = (e) => {
    const { canvas, scene, engine } = e;

    // Create a camera allways pointing on the center of the scene
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(5, 10, -10));
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // Creates ligths
    new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 10, 0), scene);
    new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, -10, 0), scene);

    
    const rubiks = new Rubiks(scene);
    
    initGUI(scene, rubiks);

    // Action handling
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyDownTrigger, (e) => {
          // console.log("EVENT", e.sourceEvent);
          const rotationInput = ['u', 'd', 'f', 'b', 'l', 'r', 'U', 'D', 'F', 'B', 'L', 'R'];
          if (rotationInput.includes(e.sourceEvent.key)) {
            rubiks.rotate(e.sourceEvent.key);
          } else {
            console.error("Unhandled key", e.sourceEvent.key)
          }
        }
      )
    );

    engine.runRenderLoop(async () => {
      if (scene) {
        scene.render();
      }
    });
  }

  render() {
    return (
      <div className="ctn-viewer">
        <Scene height='800' width='800' onSceneMount={this.onSceneMount} />
      </div>
    );
  }
}