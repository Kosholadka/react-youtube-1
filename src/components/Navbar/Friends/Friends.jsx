import s from "./Friends.module.css";

const Friends = (props) => {
  return (
    <div className={s.friendsItem}>
      <div>{props.ava}</div>
      {props.name}
    </div>
  );
};

export default Friends;
