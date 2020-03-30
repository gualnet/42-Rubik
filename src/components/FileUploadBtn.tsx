import React from 'react';

interface IFileUploadBtnProps {
  shuffleSequence: string,
  setShuffleSequence: Function,
}
interface IFileUploadBtnState { }

class FileUploadBtn extends React.Component<IFileUploadBtnProps, IFileUploadBtnState> {
  private onChangeHandler = (e: any) => {
    let fileReader = new FileReader;
    fileReader.onloadend = () => {
      const content = fileReader.result;
      // console.log("file content", content);
      this.props.setShuffleSequence(content);
    };
    fileReader.readAsText(e.target.files[0]);
  };

  render() {
    const { shuffleSequence } = this.props;
    
    return (
      <div className="Btn" id="FileUploadBtn">
        <input type="file" name="file" onChange={this.onChangeHandler} />
        {`seq: ${shuffleSequence}`}
      </div>
    );
  }
}

export default FileUploadBtn;