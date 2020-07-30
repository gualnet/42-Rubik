export default {
  INVALID: 65535,
  N_SYM: 48, // number of cube symmetries of full group Oh
  N_SYM_D4h: 16, // Number of symmetries of subgroup D4h
  N_PERM_4: 24,
  N_TWIST: 2187, // 3^7 possible corner orientations in phase 1
  N_FLIP: 2048, // 2^11 possible edge orientations in phase 1
  N_SLICE_SORTED: 11880, // 12*11*10*9 possible positions of the FR, FL, BL, BR edges in phase 1
  N_SLICE: 405, // N_SLICE_SORTED // N_PERM_4  // we ignore the permutation of FR, FL, BL, BR in phase 1
  N_FLIPSLICE_CLASS: 64430, // number of equivalence classes for combined flip+slice concerning symmetry group D4h
  N_CORNERS: 40320, // 8! corner permutations in phase 2
  N_CORNERS_CLASS: 2768, //number of equivalence classes concerning symmetry group D4h
  N_UD_EDGES: 40320, //8! permutations of the edges in the U-face and D-face in phase 2
  N_MOVE: 18, // number of possible face moves


  NB_COLORS: 6, // Number of colors
  NB_CORNERS: 8, // Number of corners
  NB_EDGES: 12, // number of edges
}