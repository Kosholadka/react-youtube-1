import { NavLink } from 'react-router-dom';
import s from './../dialogs.module.css';

export const DialogItem = props => {
   let path = '/dialogs/' + props.id;
   return (
      <div className={s.dialog + ' ' + s.active}>
         <NavLink to={path}>
            {props.ava}
            {props.name}
         </NavLink>
      </div>
   );
};
