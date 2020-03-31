import React from 'react';
// import * as BABYLON from 'babylonjs';
import * as CORE from '@babylonjs/core/';
import * as GUI from '@babylonjs/gui';
import Scene from './Scene'; // import the component above linking to file we just created.
import Rubiks from '../Rubiks'
import store from '../store';

const BABYLON = {
  ...CORE,
  GUI,
}

export default class Viewer extends React.Component {
  onSceneMount = (e) => {
    // console.log("GUI", BABYLON.GUI);
    const { canvas, scene, engine } = e;

    // Create a camera allways pointing on the center of the scene
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(5, 10, -10));
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 10, 0), scene);
    const light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, -10, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // GUI
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

    var button = BABYLON.GUI.Button.CreateImageButton("btn0", "apply sequence", './public/textures/T1.png');
    const btnSize = {
      width: '70px', height: '40px', top: `${-400+40/2}px`, left: `${-400+100/2}`
    }
    button.width = btnSize.width;
    button.height = btnSize.height;
    button.top = btnSize.top;
    button.left = btnSize.left;
    button.color = "white";
    button.background = "black";
    button.children[0].fontSize = 12;
    button.onPointerClickObservable.add(() => {
      let { shuffleSequence } = store.getState().mainReducer;
      // if (shuffleSequence.length < 1) return;
      console.log('machine', shuffleSequence);
      shuffleSequence = shuffleSequence.replace('\n', ' ');

      const shuffleArr = shuffleSequence.split(' ');
      console.log('machine2', shuffleArr);
      shuffleArr.map(letter => rubiks.rotate(letter));
      // rubiks.rotate('u');
    })
    advancedTexture.addControl(button);
    

    // const cube = new Cubie(scene);
    const rubiks = new Rubiks(scene);

    // Action handling
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyDownTrigger, (e) => {
          // console.log("EVENT", e.sourceEvent);
          const rotationInput = ['u','d','f','b','l','r','U','D','F','B','L','R'];
          if (rotationInput.includes(e.sourceEvent.key)) {
            rubiks.rotate(e.sourceEvent.key);
          } else {
            // console.error("Unhandled key", e.sourceEvent.key)
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