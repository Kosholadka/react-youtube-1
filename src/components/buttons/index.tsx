import React, { Component } from 'react';
import cuid from 'cuid';
import s from './buttons.module.css';
import TextareaAutosize from 'react-textarea-autosize';

import { Message } from './components';

class Buttons extends Component<Buttons.Props, Buttons.State> {
   private readonly textAreaRef;
   private readonly chatContainer;

   constructor(props: Buttons.Props) {
      super(props);

      this.textAreaRef = React.createRef<HTMLTextAreaElement>();

      this.chatContainer = React.createRef<HTMLDivElement>();

      this.state = {
         messages: [],
      };
   }

   private addMessage = () => {
      if (!this.textAreaRef.current) {
         return;
      }

      const { value } = this.textAreaRef.current;

      if (!value) {
         return;
      }

      const generatedId = cuid();

      const newMessage: Buttons.Message = {
         value,
         id: generatedId,
      };

      this.setState(
         {
            messages: [...this.state.messages, newMessage],
         },
         () => this.scrollToMyRef(),
      );

      this.zeroInput();
   };

   private zeroInput = () => {
      if (!this.textAreaRef.current) {
         return;
      }

      this.textAreaRef.current.value = '';
   };

   private deleteMessage = (id: string) => {
      this.setState({
         messages: this.state.messages.filter(message => message.id !== id),
      });
   };

   /**
    *
    * 1. Берём оригинальный массив
    * 2. Находим в нём нужный square
    * 3. Обнуляем title найденного square, создавая при этом modifiedSquare
    * 4. Убираем найденный square из оригинального массива, создавая при этом modifiedSquares
    * 5. Добавляем modifiedSquare в modifiedSquares
    * 6. Делаем setState, прокидывая туда наш modifiedSquares
    */

   private editMessage = (id: string) => {
      const { messages } = this.state;

      const messagesCopy = messages.slice(); // или [...squares]

      const foundMessageIndex = messagesCopy.findIndex(message => message.id === id);

      const newValue = prompt('type new value');

      if (!newValue) {
         return;
      }

      messagesCopy[foundMessageIndex].value = newValue;

      this.setState({
         messages: messagesCopy,
      });
   };

   private renderMessages = () => {
      const { messages } = this.state;

      return messages.map(message => (
         <Message
            id={message.id}
            key={message.id}
            title={message.value}
            editMessage={this.editMessage}
            deleteMessage={this.deleteMessage}
         />
      ));
   };

   private scrollToMyRef = () => {
      const scroll = this.chatContainer.current.scrollHeight - this.chatContainer.current.clientHeight;

      this.chatContainer.current.scroll({ top: scroll, behavior: 'smooth' });
   };

   render() {
      return (
         <>
            <div className={s.squaresContainer} ref={this.chatContainer}>
               {this.renderMessages()}
            </div>
            <div>
               <TextareaAutosize ref={this.textAreaRef} placeholder="type here something" minRows={3} />
               <button onClick={this.addMessage} className={s.button}>
                  Send
               </button>
            </div>
         </>
      );
   }
}

export namespace Buttons {
   export interface Props {}

   export interface State {
      messages: Message[];
   }

   export interface Message {
      id: string;
      value: string;
   }

   // export interface Props {
   //    height: 100,
   //    weight: 100,
   //    gender: Gender,
   //    eyeColor: EyeColor
   // }

   // export type Gender = 'male' | 'female' | 'nonbinary'

   // export type EyeColor = 'green' | 'blue' | 'black'
}

export default Buttons;
