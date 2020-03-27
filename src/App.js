import React from 'react';
import './App.css';
import Viewer from './Viewer';
import FileUploadBtn from './components/FileUploadBtn';

function App() {
  return (
    <div className="App">
        <FileUploadBtn />
        <Viewer />
    </div>
  );
}

export default App;
