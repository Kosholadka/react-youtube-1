import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import React from 'react';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader';

class App extends React.Component {
   componentDidMount() {
      this.props.initializeApp();
   }

   render() {
      if (!this.props.initialization) {
         return <Preloader />;
      }

      return (
         <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="app-wrapper">
               <HeaderContainer />
               <Navbar state={this.props.sidebar} />
               <div className="app-wrapper-content">
                  <Route path="/dialogs" render={() => <DialogsContainer />} />
                  <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                  <Route path="/users" render={() => <UsersContainer />} />
                  <Route path="/login" render={() => <LoginPage />} />
                  <Route path="/news" component={News} />
                  <Route path="/music" component={Music} />
                  <Route path="/settings" component={Settings} />
               </div>
            </div>
         </BrowserRouter>
      );
   }
}

const mapStateToProps = state => ({
   initialization: state.app.initialization,
});

export default connect(mapStateToProps, { initializeApp })(App);
