import { followUnfollowAPI, usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/validators/object-helpers';

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
   users: [],
   pageSize: 10,
   totalUsersCount: 0,
   currentPage: 1,
   isFetching: true,
   followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
   switch (action.type) {
      case FOLLOW: {
         return {
            ...state,
            users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }),
         };
      }
      case UNFOLLOW: {
         return {
            ...state,
            users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }),
         };
      }
      case SET_USERS: {
         return { ...state, users: action.users };
      }
      case SET_CURRENT_PAGE: {
         return { ...state, currentPage: action.currentPage };
      }
      case SET_TOTAL_USERS_COUNT: {
         return { ...state, totalUsersCount: action.count };
      }
      case TOGGLE_IS_FETCHING: {
         return { ...state, isFetching: action.isFetching };
      }
      case TOGGLE_IS_FOLLOWING_PROGRESS: {
         return {
            ...state,
            followingInProgress: action.isFetching
               ? [...state.followingInProgress, action.userId]
               : state.followingInProgress.filter(id => id !== action.userId),
         };
      }
      default:
         return state;
   }
};

export const followSuccess = userId => ({ type: FOLLOW, userId });
export const unfollowSuccess = userId => ({ type: UNFOLLOW, userId });
export const setUsers = users => ({ type: SET_USERS, users });
export const setCurrentPage = currentPage => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = totalUsersCount => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });
export const toggleIsFetching = isFetching => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingInProgress = (isFetching, userId) => ({
   type: TOGGLE_IS_FOLLOWING_PROGRESS,
   isFetching,
   userId,
});

export const requestUsers = (currentPage, pageSize) => async dispatch => {
   dispatch(toggleIsFetching(true));
   dispatch(setCurrentPage(currentPage));
   let responce = await usersAPI.requestUsers(currentPage, pageSize);
   dispatch(toggleIsFetching(false));
   dispatch(setUsers(responce.data.items));
   dispatch(setTotalUsersCount(responce.data.totalCount));
};

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
   dispatch(toggleFollowingInProgress(true, userId));
   let responce = await apiMethod(userId);

   if (responce.data.resultCode === 0) {
      dispatch(actionCreator(userId));
   }
   dispatch(toggleFollowingInProgress(false, userId));
};

export const follow = userId => {
   return async dispatch => {
      followUnfollowFlow(dispatch, userId, followUnfollowAPI.follow.bind(followUnfollowAPI), followSuccess);
   };
};

export const unfollow = userId => {
   return async dispatch => {
      followUnfollowFlow(dispatch, userId, followUnfollowAPI.unfollow.bind(followUnfollowAPI), unfollowSuccess);
   };
};

export default usersReducer;
