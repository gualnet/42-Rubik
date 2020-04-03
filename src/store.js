import { createStore, combineReducers } from 'redux';
import mainReducer from './reducers/main';

const globalReducer = combineReducers({
  mainReducer
});

const store = createStore(
  globalReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
