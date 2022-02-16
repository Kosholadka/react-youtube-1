import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';
import Friends from './Friends/Friends';

const Navbar = props => {
   const friendsElements = props.state.friends.map(f => <Friends name={f.name} key = {f.id} id={f.id} ava={f.ava} />);

   return (
      <nav className={s.nav}>
         <div className={s.item}>
            <NavLink to="/profile" activeClassName={s.activeLink}>
               Profile
            </NavLink>
         </div>
         <div className={s.item}>
            <NavLink to="/dialogs" activeClassName={s.activeLink}>
               Messages
            </NavLink>
         </div>
         <div className={s.item}>
            <NavLink to="/news" activeClassName={s.activeLink}>
               News
            </NavLink>
         </div>
         <div className={s.item}>
            <NavLink to="/music" activeClassName={s.activeLink}>
               Music
            </NavLink>
         </div>
         <div className={s.item}>
            <NavLink to="/settings" activeClassName={s.activeLink}>
               Settings
            </NavLink>
         </div>
         <div className={s.item}>
            <NavLink to="/users" activeClassName={s.activeLink}>
               Users
            </NavLink>
         </div>
         <div className={s.item}>
            <NavLink to="/clicker" activeClassName={s.activeLink}>
               Clicker
            </NavLink>
         </div>
         <div className={s.item}>
            <NavLink to="/tictactoe" activeClassName={s.activeLink}>
               TicTacToe
            </NavLink>
         </div>
         <div className={s.item}>
            <NavLink to="/buttons" activeClassName={s.activeLink}>
               Buttons
            </NavLink>
         </div>
         <div>
            <h2>Friends</h2>
            <div className={s.friends}>{friendsElements}</div>
         </div>
      </nav>
   );
};

export default Navbar;
