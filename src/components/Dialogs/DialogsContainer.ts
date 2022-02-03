import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { sendMessageActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from '.';

let mapStateToProps = state => {
   return {
      dialogsPage: state.dialogsPage,
   };
};

let mapDispatchToProps = dispatch => {
   return {
      sendMessage: newMessageElement => {
         dispatch(sendMessageActionCreator(newMessageElement));
      },
   };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);
