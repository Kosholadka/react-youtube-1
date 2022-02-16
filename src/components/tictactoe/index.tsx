import { useEffect, useState } from 'react';
import Cell from './components/cell';

import s from './index.module.css';

const Tictactoe = () => {
   const [state, setState] = useState<StateType>({
      cell1: undefined,
      cell2: undefined,
      cell3: undefined,
      cell4: undefined,
      cell5: undefined,
      cell6: undefined,
      cell7: undefined,
      cell8: undefined,
      cell9: undefined,
   });

   const [step, setStep] = useState(0);

   const onClick = (id: string) => {
      setState(prevState => ({
         ...prevState,
         [id]: Number.isInteger(step / 2) ? '0' : 'X',
      }));
      setStep(step => step + 1);
   };

   useEffect(() => {
      if (state.cell1 === '0' && state.cell4 === '0' && state.cell7 === '0') {
         alert('Win!');
      }
      if (state.cell1 === 'X' && state.cell4 === 'X' && state.cell7 === 'X') {
         alert('Win!');
      }
   });

   return (
      <div className={s.field}>
         <div>
            <Cell id="cell1" value={state.cell1} onClick={onClick} />
            <Cell id="cell2" value={state.cell2} onClick={onClick} />
            <Cell id="cell3" value={state.cell3} onClick={onClick} />
         </div>
         <div>
            <Cell id="cell4" value={state.cell4} onClick={onClick} />
            <Cell id="cell5" value={state.cell5} onClick={onClick} />
            <Cell id="cell6" value={state.cell6} onClick={onClick} />
         </div>
         <div>
            <Cell id="cell7" value={state.cell7} onClick={onClick} />
            <Cell id="cell8" value={state.cell8} onClick={onClick} />
            <Cell id="cell9" value={state.cell9} onClick={onClick} />
         </div>
      </div>
   );
};

type StateType = {
   cell1: CellValueType;
   cell2: CellValueType;
   cell3: CellValueType;
   cell4: CellValueType;
   cell5: CellValueType;
   cell6: CellValueType;
   cell7: CellValueType;
   cell8: CellValueType;
   cell9: CellValueType;
};

type CellValueType = '0' | 'X' | undefined;

export default Tictactoe;
