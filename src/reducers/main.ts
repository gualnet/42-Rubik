
export interface State {
  shuffleSequence: string[];
};

export interface Actions {
  type: actionTypes,
  payload: string[],
};

export enum actionTypes {
  RESET,
  SET_SHUFFLE_SEQ,
};

export const actions = {
  setSchuffleSequence: (status: string[]): Actions => ({
    type: actionTypes.SET_SHUFFLE_SEQ,
    payload: status,
  }),
}

const initState: State = {
  shuffleSequence: [],
};

/* eslint-disable no-param-reassign */
const mainReducer = (state = initState, action: Actions): State => {
  switch (action.type) {
    case actionTypes.RESET:
      state = { ...initState };
      break;
    case actionTypes.SET_SHUFFLE_SEQ:
      console.log('av state', state)
      console.log('action.payload', action.payload)

      state = {
        ...state,
        shuffleSequence: action.payload,
      };
      console.log('ap state', state)
      break;


    default:
      return (state);
  }
  return (state);
};
/* eslint-enable no-param-reassign */

export default mainReducer;
