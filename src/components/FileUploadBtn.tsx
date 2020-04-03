import React from 'react';

interface IFileUploadBtnProps {
  shuffleSequence: string[],
  setShuffleSequence: Function,
}
interface IFileUploadBtnState { }

const VALID_CHAR = ['u','d','f','b','l','r','U','D','F','B','L','R', '\''];

class FileUploadBtn extends React.PureComponent<IFileUploadBtnProps, IFileUploadBtnState> {
  private MEPFormat = (raw: string): string[] => {
    if (!raw || raw.length < 1) return [];
  
    const formatedSequence: string[] = [];
  
    let movesArr = raw.trim().toUpperCase().split(' ');
    for (const move of movesArr) {
      if (move.length === 2 && VALID_CHAR.includes(move.slice(0,1)) && move.includes('\'')) {
        formatedSequence.push(move.slice(0,1));
      } else {
        formatedSequence.push(move.toLowerCase());
      }
    }
    return formatedSequence;
  };
  
  private onChangeHandler = (e: any) => {
    let fileReader = new FileReader();
    fileReader.onloadend = () => {
      const content = fileReader.result;
      // console.log("file content", content);
      const sequenceStr = this.MEPFormat(content?.toString()||"");
      this.props.setShuffleSequence(sequenceStr);
    };
    fileReader.readAsText(e.target.files[0]);
  };

  render() {
    const { shuffleSequence } = this.props;
    // console.log('shuffleSequence', shuffleSequence, typeof shuffleSequence);
    return (
      <div className="Btn" id="FileUploadBtn">
        <input type="file" name="file" onChange={this.onChangeHandler} />
        {`seq: ${shuffleSequence.join(' ')}`}
      </div>
    );
  }
}

export default FileUploadBtn;