import { EColors, ECorners, EEdges, EFacelets } from './enums';
import * as Enums from './enums'
import CubieCube from './CubieCube';

/***************************
 * Cube on a Facelet Level *
 ***************************/

export default class FaceletCube {
  faceletsStr: string; // string representation of the facelets
  facelets: Array<EColors>;
  cornerFacelet: Array<Array<EFacelets>>;
  cornerColor: Array<Array<EColors>>;

  constructor(cubeString?: string) {
    // Value of faceletsStr
    if (typeof(cubeString) === 'string' && cubeString.length === 54) {
      this.faceletsStr = cubeString;
    } else {
      this.faceletsStr = 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB';
    }

    // Value of facelets
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

    // Value of cornerFacelet
    this.cornerFacelet = [
      [ EFacelets.U9, EFacelets.R1, EFacelets.F3 ], [ EFacelets.U7, EFacelets.F1, EFacelets.L3 ], [ EFacelets.U1, EFacelets.L1, EFacelets.B3 ], [ EFacelets.U3, EFacelets.B1, EFacelets.R3 ],
      [ EFacelets.D3, EFacelets.F9, EFacelets.R7 ], [ EFacelets.D1, EFacelets.L9, EFacelets.F7 ], [ EFacelets.D7, EFacelets.B9, EFacelets.L7 ], [ EFacelets.D9, EFacelets.R9, EFacelets.B7 ],
    ];
    // Value of cornerColor
    this.cornerColor = [
      [ EColors.U, EColors.R, EColors.F ], [ EColors.U, EColors.F, EColors.L ], [ EColors.U, EColors.L, EColors.B ], [ EColors.U, EColors.B, EColors.R ],
      [ EColors.D, EColors.F, EColors.R ], [ EColors.D, EColors.L, EColors.F ], [ EColors.D, EColors.B, EColors.L ], [ EColors.D, EColors.R, EColors.B ],
    ]

  }

  /***********
   * toString
   ***********/
  toString: Function = () => {
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

  /**************
   * toCubieCube
   **************/
  toCubieCube = () => {
    let orientation;
    const cubieCube = new CubieCube();

    // Invalidate corners & Edges
    for (let i = 0; i < Enums.CornersNb; i++) {
      cubieCube.cornersPosition[i] = ECorners.URF;
    }
    for (let i = 0; i < Enums.EdgesNb; i++) {
      cubieCube.edgesPosition[i] = EEdges.UR;
    }
    // ***

    // 
    let color1: EColors, color2: EColors;
    Enums.CornersArr.map((value, idx) => {
      for (let orientation = 0; orientation < 3; orientation++) {
        
        const cornerFaceletPlace = this.cornerFacelet[idx][orientation]
        const faceletColor = this.facelets[cornerFaceletPlace]
        // console.log("faceletColor>>", faceletColor, EColors[faceletColor])
        if (faceletColor === EColors.U || faceletColor === EColors.D) break;

        const cornerFaceletPlace1 = this.cornerFacelet[idx][(orientation + 1) % 3]
        const cornerFaceletPlace2 = this.cornerFacelet[idx][(orientation + 2) % 3]
        color1 = this.facelets[cornerFaceletPlace1]
        color2 = this.facelets[cornerFaceletPlace2]

        Enums.CornersArr.map((value, idx2) => {
          const x = cubieCube.cornersPosition[idx]
          const y = ECorners[2]
          const z = ECorners.ULB
          // const test = x ===  ECorners[2]
          // console.log('X', x,'Y', y, 'Z', z)
          // console.log('-->', ECorners['ULB'])
          if (this.cornerColor[idx2][1] === color1 && this.cornerColor[idx2][2] === color2) {

          }
          // if (color1 === )
        });
      }
    });
    




  }

}