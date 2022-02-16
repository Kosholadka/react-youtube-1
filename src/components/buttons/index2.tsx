import { Component } from 'react';
import Square from './components/square';

class Buttons extends Component {
   state = {
      numSquare: 0,
   };

   addSquare = () => {
      this.setState({
         numSquare: this.state.numSquare + 1,
      });
   };

   deleteSquare = () => {
      this.setState({
         numSquare: this.state.numSquare - 1,
      });
   };

   render() {
      const squares = [];

      for (let i = 1; i <= this.state.numSquare; i += 1) {
         squares.push(<Square id={i} />);
      }

      return (
         <div>
            <button onClick={this.addSquare}>Add</button>
            <button onClick={this.deleteSquare}>Delete</button>
            {squares}
         </div>
      );
   }
}

export default Buttons;
