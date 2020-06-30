import { Corners as CORNERS, Edges as EDGES } from './enums';

export interface ICorner {
  c: CORNERS, // current corner/place
  o: number,  // current orientation  0-3
}
export interface IEdge {
  e: EDGES, // current edge/place
  o: number, // current orientation 0-2
}
export interface ICorners {
  [CORNERS.URF]: ICorner,
  [CORNERS.ULF]: ICorner,
  [CORNERS.ULB]: ICorner,
  [CORNERS.UBR]: ICorner,
  [CORNERS.DFR]: ICorner,
  [CORNERS.DLF]: ICorner,
  [CORNERS.DBL]: ICorner,
  [CORNERS.DRB]: ICorner,
}
export interface IEdges {
  [EDGES.UR]: IEdge,
  [EDGES.UF]: IEdge,
  [EDGES.UL]: IEdge,
  [EDGES.UB]: IEdge,
  [EDGES.DR]: IEdge,
  [EDGES.DF]: IEdge,
  [EDGES.DL]: IEdge,
  [EDGES.DB]: IEdge,
  [EDGES.FR]: IEdge,
  [EDGES.FL]: IEdge,
  [EDGES.BL]: IEdge,
  [EDGES.BR]: IEdge,
}