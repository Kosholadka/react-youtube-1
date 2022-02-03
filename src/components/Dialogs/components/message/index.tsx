import s from './message.module.css';

export const Message = props => {
   return <div className={s.bubble}>{props.message}</div>;
};
