import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import store from './store';
import Viewer from './babylon/Viewer';
import FileUploadBtn from './containers/FileUploadBtn';

import resolver from './resolver'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <FileUploadBtn test="true"/>
        <button onClick={ () => resolver.twoPhases()}>Resolver TEST</button>
        <Viewer />
      </Provider>
    </div>
  );
}

export default App;
