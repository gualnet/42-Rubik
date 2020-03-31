import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import store from './store';
import Viewer from './babylon/Viewer';
import FileUploadBtn from './containers/FileUploadBtn';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <FileUploadBtn test="true"/>
        <Viewer />
      </Provider>
    </div>
  );
}

export default App;
