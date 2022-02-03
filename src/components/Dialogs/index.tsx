import { reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { Component, ReactNode } from 'react';

import { Message, DialogItem, DialogsForm } from './components';

import s from './dialogs.module.css';

const DialogsReduxForm = reduxForm({ form: 'post' })(DialogsForm);

class Dialogs extends Component<Dialogs.Props> {
   private renderDialogsElement = ({ name, id, ava }: Dialogs.Dialog) => (
      <DialogItem name={name} key={id} id={id} ava={ava} />
   );

   private renderMessagesElements = ({ message, id }: Dialogs.Message) => (
      <Message message={message} key={id} id={id} />
   );

   private addNewMessage = (values: { newMessageElement: string }) => {
      const { sendMessage } = this.props;
      sendMessage(values.newMessageElement);
   };

   render() {
      const {
         isAuth,
         dialogsPage: { dialogs, messages },
      } = this.props;

      if (!isAuth) {
         return <Redirect to={'/login'} />;
      }

      return (
         <div className={s.dialogs}>
            <div className={s.dialogsItem}>{dialogs.map(this.renderDialogsElement)}</div>
            <div className={s.messages}>
               {messages.map(this.renderMessagesElements)}
               <DialogsReduxForm
                  // FIXME: пофиксить типизацию
                  onSubmit={this.addNewMessage}
               />
            </div>
         </div>
      );
   }
}

export namespace Dialogs {
   export interface Props {
      dialogsPage: {
         dialogs: Dialog[];
         messages: Message[];
      };
      sendMessage: (value: unknown) => void;
      isAuth: boolean;
   }

   export interface Dialog {
      id: number;
      name: string;
      // FIXME: уточнить тип, здесь нужен img
      ava: ReactNode;
   }

   export interface Message {
      id: number;
      message: string;
   }
}

export default Dialogs;
