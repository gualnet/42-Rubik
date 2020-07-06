import * as GUI from '@babylonjs/gui';

import store from '../store';
import Rubiks from '../Rubiks';
import resolver from '../resolver/resolver';
// import Cubie from '../Cubie';

const BUTTON_OPTIONS = {
  name: "name",
  text: "button text",
  width: '100px', height: '50px',
  top: `0px`, left: `0px`,
  color: "white",
  background: "black",
  fontSize: 12,
}

const BUTTONS: Array<GUI.Button> = [];

const createBtn = (btnOptions: any): GUI.Button => {
  const button = GUI.Button.CreateImageButton(btnOptions.name, btnOptions.text, "");
  button.width = btnOptions.width;
  button.height = btnOptions.height;
  button.top = btnOptions.top;
  button.left = btnOptions.left;
  button.color = btnOptions.color;
  button.background = btnOptions.background;
  button.children[0].fontSize = btnOptions.fontSize;
  BUTTONS.push(button);
  return button;
};

export const initGUI = (scene: any, rubiks: Rubiks) => {

  const UIManager = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

  // Button1
  const btn1 = createBtn({
    ...BUTTON_OPTIONS,
    text: "apply sequence",
    width: '70px', height: '40px',
    top: `${-400 + 40 / 2}px`, left: `${-400 + 100 / 2}px`,
  });
  btn1.onPointerClickObservable.add(() => {
    const { shuffleSequence } = store.getState().mainReducer;
    if (shuffleSequence.length < 1) return;
    shuffleSequence.map((letter: string) => rubiks.rotate(letter));
  });

  const btn2 = createBtn({
    ...BUTTON_OPTIONS,
    text: "RESOLV",
    width: '70px', height: '40px',
    top: `${-360 + 40 / 2}px`, left: `${-400 + 100 / 2}px`,
  });
  btn2.onPointerClickObservable.add(() => {
    console.log('resolv-me');
    // resolver.twoPhases();
  });

  const btn3 = createBtn({
    ...BUTTON_OPTIONS,
    text: "print cubies state",
    width: '70px', height: '40px',
    top: `${-320 + 40 / 2}px`, left: `${-400 + 100 / 2}px`,
  });
  btn3.onPointerClickObservable.add(() => {
    console.log("CUBIES STATE")
    // rubiks.cubies[7].currentPos.x += 3;
    // rubiks.cubies[14].currentPos.x += 3;
    // rubiks.cubies[16].currentPos.x += 3;
    // rubiks.cubies[24].currentPos.x += 3;
    rubiks.cubies[7].print()
    // console.log(rubiks.cubies);
  });

  BUTTONS.map(btn => UIManager.addControl(btn));
};