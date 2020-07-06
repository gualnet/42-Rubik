import { ECorners, EEdges } from './enums';

export interface ICorner {
  c: ECorners, // current corner/place
  o: number,  // current orientation  0-3
}
export interface IEdge {
  e: EEdges, // current edge/place
  o: number, // current orientation 0-2
}
export interface ICorners {
  [ECorners.URF]: ICorner,
  [ECorners.ULF]: ICorner,
  [ECorners.ULB]: ICorner,
  [ECorners.UBR]: ICorner,
  [ECorners.DFR]: ICorner,
  [ECorners.DLF]: ICorner,
  [ECorners.DBL]: ICorner,
  [ECorners.DRB]: ICorner,
}
export interface IEdges {
  [EEdges.UR]: IEdge,
  [EEdges.UF]: IEdge,
  [EEdges.UL]: IEdge,
  [EEdges.UB]: IEdge,
  [EEdges.DR]: IEdge,
  [EEdges.DF]: IEdge,
  [EEdges.DL]: IEdge,
  [EEdges.DB]: IEdge,
  [EEdges.FR]: IEdge,
  [EEdges.FL]: IEdge,
  [EEdges.BL]: IEdge,
  [EEdges.BR]: IEdge,
}