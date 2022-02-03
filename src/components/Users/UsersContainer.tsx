import React from 'react';
import { connect } from 'react-redux';
import { follow, setCurrentPage, unfollow, toggleFollowingInProgress, requestUsers } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import {
   getcurrentPage,
   getfollowingInProgress,
   getIsFetching,
   getpageSize,
   getTotalUsersCount,
   getUsers,
} from '../../redux/users-selectors';

class UsersContainer extends React.Component {
   componentDidMount() {
      const { currentPage, pageSize } = this.props;
      this.props.requestUsers(currentPage, pageSize);
   }

   onPageChanged = pageNumber => {
      const { pageSize } = this.props;
      this.props.requestUsers(pageNumber, pageSize);
   };

   render() {
      return (
         <>
            {this.props.isFetching ? <Preloader /> : null}

            <Users
               totalUsersCount={this.props.totalUsersCount}
               users={this.props.users}
               pageSize={this.props.pageSize}
               currentPage={this.props.currentPage}
               onPageChanged={this.onPageChanged}
               follow={this.props.follow}
               unfollow={this.props.unfollow}
               followingInProgress={this.props.followingInProgress}
            />
         </>
      );
   }
}

let mapStateToProps = state => {
   return {
      users: getUsers(state),
      pageSize: getpageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getcurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getfollowingInProgress(state),
   };
};

export default compose(
   // withAuthRedirect,
   connect(mapStateToProps, {
      follow,
      unfollow,
      setCurrentPage,
      toggleFollowingInProgress,
      requestUsers,
   }),
)(UsersContainer);
