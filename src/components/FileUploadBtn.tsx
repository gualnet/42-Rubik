import React from 'react';

  class FileUploadBtn extends React.Component {
    private onChangeHandler = (e: any) => {
      let fileReader = new FileReader;
      fileReader.onloadend = () => {
        const content = fileReader.result;
        console.log("file content", content);
      };
      fileReader.readAsText(e.target.files[0]);

    }

    render(){
      console.log("RENDERED")
      return (
        <div className="Btn" id="FileUploadBtn">
          <input type="file" name="file" onChange={this.onChangeHandler}/>
        </div>
      );
    }
  }



export default FileUploadBtn;