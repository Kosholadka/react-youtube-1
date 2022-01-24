import s from "./Message.module.css";

const Message = (props) => {
  return <div className={s.bubble}>{props.message}</div>;
};

export default Message;
