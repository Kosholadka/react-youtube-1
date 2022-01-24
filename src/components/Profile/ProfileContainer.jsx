import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile, getUserStatus, updateUserStatus } from '../../redux/profile-reducer';
import Profile from './Profile';
import { withRouter } from 'react-router';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
   componentDidMount() {
      let userId = this.props.match.params.userId;
      if (!userId) {
         userId = this.props.authorizedUserId;
         if (!userId) {
            this.props.history.push('/login');
         }
      }
      this.props.getUserProfile(userId);
      this.props.getUserStatus(userId);
   }

   render() {
      return (
         <div>
            <Profile
               {...this.props}
               profile={this.props.profile}
               status={this.props.status}
               updateUserStatus={this.props.updateUserStatus}
            />
         </div>
      );
   }
}

let mapStateToProps = state => {
   return {
      profile: state.profilePage.profile,
      status: state.profilePage.status,
      authorizedUserId: state.auth.userId,
      isAuth: state.auth.isAuth,
   };
};

export default compose(
   connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
   withRouter,
)(ProfileContainer);
