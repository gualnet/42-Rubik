import { EColors } from './enums';
import CubieCube from './CubieCube';

/**
 * Cube on a Facelet Level
 */

export default class FaceletCube {
  facelets: Array<EColors>;
  faceletsStr: string; // string representation of the facelets

  constructor(cubeString?: string) {
    if (typeof(cubeString) === 'string' && cubeString.length === 54) {
      this.faceletsStr = cubeString;
    } else {
      this.faceletsStr = 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB';
    }

    this.facelets = [];
    for (const letter of this.faceletsStr) {
      switch (letter) {
        case 'U':
          this.facelets.push(EColors.U)
          break;
        case 'R':
          this.facelets.push(EColors.R)
          break;
        case 'F':
          this.facelets.push(EColors.F)
          break;
        case 'D':
          this.facelets.push(EColors.D)
          break;
        case 'L':
          this.facelets.push(EColors.L)
          break;
        case 'B':
          this.facelets.push(EColors.B)
          break;
        default:
          break;
      }
    }

    if (this.facelets.length !== 54) throw Error('Error constructing facelet representation')
  }

  /**
   * toString
   */
  toString = () => {
    const array: string[] = [];
    
    this.facelets.map(elem => {
      switch (elem) {
        case EColors.U:
          array.push('U')
          break;
        case EColors.R:
          array.push('R')
          break;
        case EColors.F:
          array.push('F')
          break;
        case EColors.D:
          array.push('D')
          break;
        case EColors.L:
          array.push('L')
          break;
        case EColors.B:
          array.push('B')
          break;
        default:
          break;
      }
    });
    return(array.join(''));
  }

  /**
   * toCubieCube
   */
  toCubieCube = () => {
    let orientation;
    const cubieCube = new CubieCube();

    


  }

}