import { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import News from './components/News/News';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './components/Login/Login';
import Settings from './components/Settings/Settings';
import Preloader from './components/common/Preloader';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/dialogs/DialogsContainer';

import './App.css';
import { initializeApp } from './redux/app-reducer';
import Clicker from './components/clicker';
import Tictactoe from './components/tictactoe';
import Buttons from './components/buttons/index';

interface Props {
   sidebar: unknown;
   initialization: boolean;
   initializeApp: () => void;
}

class App extends Component<Props> {
   componentDidMount() {
      const { initializeApp } = this.props;

      initializeApp();
   }

   render() {
      const { initialization, sidebar } = this.props;

      if (!initialization) {
         return <Preloader />;
      }

      return (
         <HashRouter>
            <div className="app-wrapper">
               <HeaderContainer />
               <Navbar state={sidebar} />
               <div className="app-wrapper-content">
                  <Route path="/dialogs" render={() => <DialogsContainer />} />
                  <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                  <Route path="/users" render={() => <UsersContainer />} />
                  <Route path="/login" render={() => <LoginPage />} />
                  <Route path="/news" component={News} />
                  <Route path="/music" component={Music} />
                  <Route path="/settings" component={Settings} />
                  <Route path="/clicker" component={Clicker} />
                  <Route path="/tictactoe" component={Tictactoe} />
                  <Route path="/buttons" component={Buttons} />
               </div>
            </div>
         </HashRouter>
      );
   }
}

const mapStateToProps = state => ({
   initialization: state.app.initialization,
});

export default connect(mapStateToProps, { initializeApp })(App);
