import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import Profile from './Profile';
import { withRouter } from 'react-router';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
   refreshProfile() {
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

   componentDidMount() {
      debugger;
      this.refreshProfile();
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      debugger;
      if (this.props.match.params.userId != prevProps.match.params.userId) {
         this.refreshProfile();
      }
   }

   render() {
      return (
         <div>
            <Profile
               {...this.props}
               isOwner={!this.props.match.params.userId}
               profile={this.props.profile}
               status={this.props.status}
               updateUserStatus={this.props.updateUserStatus}
               savePhoto={this.props.savePhoto}
               saveProfile={this.props.saveProfile}
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
   connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile }),
   withRouter,
)(ProfileContainer);
