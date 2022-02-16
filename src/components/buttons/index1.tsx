import { Component } from 'react';
import cuid from 'cuid';

import Square from './components/square';

class Buttons extends Component {
   state = {
      squares: [],
   };

   addSquareToBeggining = () => {
      const generatedId = cuid();

      this.setState(prevState => ({
         squares: [
            {
               id: generatedId,
               number: prevState.squares.length + 1,
            },
            ...prevState.squares,
         ],
      }));
   };

   addSquare = () => {
      const generatedId = cuid();

      this.setState(prevState => ({
         squares: [
            ...prevState.squares,
            {
               id: generatedId,
               number: prevState.squares.length + 1,
            },
         ],
      }));
   };

   deleteSquare = title => {
      this.setState(prevState => ({
         squares: prevState.squares.filter(square => square.number !== title),
      }));
   };

   renderSquares = () => {
      const { squares } = this.state;

      return squares.map(square => <Square key={square.id} title={square.number} deleteSquare={this.deleteSquare} />);
   };

   render() {
      return (
         <div>
            <button onClick={this.addSquare}>Add</button>
            <button onClick={this.addSquareToBeggining}>Add to beginning</button>
            {this.renderSquares()}
         </div>
      );
   }
}

export default Buttons;
