import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { Textarea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';

const maxLength50 = maxLengthCreator(50);

const DialogsForm = props => {
   return (
      <form onSubmit={props.handleSubmit}>
         <Field
            placeholder="Type your message"
            name="newMessageElement"
            component={Textarea}
            validate={[required, maxLength50]}
         />
         <div>
            <button>Send message</button>
         </div>
      </form>
   );
};

const DialogsReduxForm = reduxForm({ form: 'post' })(DialogsForm);

const Dialogs = props => {
   let dialogsElements = props.dialogsPage.dialogs.map(d => (
      <DialogItem name={d.name} key={d.id} id={d.id} ava={d.ava} />
   ));

   let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id} id={m.id} />);

   const addNewMessage = values => {
      props.sendMessage(values.newMessageElement);
   };

   if (!props.isAuth) return <Redirect to={'/login'} />;

   return (
      <div className={s.dialogs}>
         <div className={s.dialogsItem}>{dialogsElements}</div>
         <div className={s.messages}>
            {messagesElements}
            <DialogsReduxForm onSubmit={addNewMessage} />
         </div>
      </div>
   );
};

export default Dialogs;
