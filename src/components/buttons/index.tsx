import React, { Component } from 'react';
import cuid from 'cuid';
import s from './buttons.module.css';

import { Square } from './components';

class Buttons extends Component<Buttons.Props, Buttons.State> {
   private readonly inputRef;
   private readonly chatContainer;

   constructor(props: Buttons.Props) {
      super(props);

      this.inputRef = React.createRef<HTMLInputElement>();

      this.chatContainer = React.createRef<HTMLDivElement>();

      this.state = {
         squares: [],
      };
   }

   private addSquare = () => {
      if (!this.inputRef.current) {
         return;
      }

      const { value } = this.inputRef.current;

      if (!value) {
         return;
      }

      const generatedId = cuid();

      const newSquare: Buttons.Square = {
         value,
         id: generatedId,
      };

      this.setState(
         {
            squares: [...this.state.squares, newSquare],
         },
         () => this.scrollToMyRef(),
      );

      this.zeroInput();
   };

   private zeroInput = () => {
      if (!this.inputRef.current) {
         return;
      }

      this.inputRef.current.value = '';
   };

   private deleteSquare = (id: string) => {
      this.setState({
         squares: this.state.squares.filter(square => square.id !== id),
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

   private editSquare = (id: string) => {
      const { squares } = this.state;

      const squaresCopy = squares.slice(); // или [...squares]

      const foundSquareIndex = squaresCopy.findIndex(square => square.id === id);

      const newValue = prompt('type new value');

      if (!newValue) {
         return;
      }

      squaresCopy[foundSquareIndex].value = newValue;

      this.setState({
         squares: squaresCopy,
      });
   };

   private renderSquares = () => {
      const { squares } = this.state;

      return squares.map(square => (
         <Square
            id={square.id}
            key={square.id}
            title={square.value}
            editSquare={this.editSquare}
            deleteSquare={this.deleteSquare}
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
               {this.renderSquares()}
            </div>
            <div className={s.input}>
               <input ref={this.inputRef} placeholder="type here something" />
               <button onClick={this.addSquare} className={s.button}>
                  Add
               </button>
            </div>
         </>
      );
   }
}

export namespace Buttons {
   export interface Props {}

   export interface State {
      squares: Square[];
   }

   export interface Square {
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
