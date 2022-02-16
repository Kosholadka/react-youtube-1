import { useCallback, useRef, useState } from 'react';

import cn from 'classnames';
import s from './clicker.module.css';

const Clicker = () => {
   const intervalRef = useRef(null);

   const [seconds, setSeconds] = useState(0);
   const [start, setStart] = useState(false);

   const startCounting = useCallback(() => {
      setStart(true);
      const interval = setInterval(() => {
         setSeconds(seconds => seconds + 5);
      }, 1000);
      intervalRef.current = interval;
   }, []);

   const stopCounting = useCallback(() => {
      setStart(false);
      setSeconds(0);
      clearInterval(intervalRef.current);
   }, []);

   return (
      <div className={s.clicker}>
         <div className={s.value}>{seconds}</div>
         {!start && (
            <button onClick={startCounting} className={s.button}>
               Start
            </button>
         )}
         {start && (
            <button onClick={stopCounting} className={cn(s.button, s.stop)}>
               Stop
            </button>
         )}
      </div>
   );
};

export default Clicker;
