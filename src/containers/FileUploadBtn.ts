
import { connect } from 'react-redux';

import FileUploadBtn from '../components/FileUploadBtn';
import {actions} from '../reducers/main';

const mapStateToProps = (state: any) => {
  return {
    shuffleSequence: state.mainReducer.shuffleSequence,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setShuffleSequence: (param: string[]) => {
      dispatch(actions.setSchuffleSequence(param));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadBtn);