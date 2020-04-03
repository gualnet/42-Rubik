import * as GUI from '@babylonjs/gui';

import store from '../store';
import Rubiks from '../Rubiks';

const BUTTON_OPTIONS = {
  name: "name",
  text: "button text",
  width: '100px', height: '50px',
  top: `0px`, left: `0px`,
  color: "white",
  background: "black",
  fontSize: 12,
}

const createBtn = (btnOptions: any, UIManager: GUI.AdvancedDynamicTexture, rubiks: Rubiks): void => {
  const button = GUI.Button.CreateImageButton(btnOptions.name, btnOptions.text, "");

  button.width = btnOptions.width;
  button.height = btnOptions.height;
  button.top = btnOptions.top;
  button.left = btnOptions.left;
  button.color = btnOptions.color;
  button.background = btnOptions.background;
  button.children[0].fontSize = btnOptions.fontSize;

  // Func to be executed when we press on the button
  button.onPointerClickObservable.add(() => {
    const { shuffleSequence } = store.getState().mainReducer;
    if (shuffleSequence.length < 1) return;
    shuffleSequence.map((letter: string) => rubiks.rotate(letter));
  });

  UIManager.addControl(button);
};

export const initGUI = (scene: any, rubiks: Rubiks) => {

  const UIManager = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

  const btnOption1 = {
    ...BUTTON_OPTIONS,
    text: "apply sequence",
    width: '70px', height: '40px',
    top: `${-400 + 40 / 2}px`, left: `${-400 + 100 / 2}px`,
  };

  createBtn(btnOption1, UIManager, rubiks);


};