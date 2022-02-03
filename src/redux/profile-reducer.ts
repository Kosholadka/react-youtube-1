import { profileAPI } from '../api/api';

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

let initialState = {
   posts: [
      { id: 1, message: 'Hi, how are you?', likesCount: 15 },
      { id: 2, message: "It's my first post", likesCount: 20 },
      { id: 3, message: "It's my second post", likesCount: 21 },
      { id: 4, message: "It's my third post", likesCount: 18 },
   ],
   profile: null,
   status: '',
};

const profileReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_POST: {
         return {
            ...state,
            posts: [...state.posts, { id: 5, message: action.newPostText, likesCount: 0 }],
         };
      }
      case SET_USER_STATUS: {
         return {
            ...state,
            status: action.status,
         };
      }
      case SET_USER_PROFILE: {
         return {
            ...state,
            profile: action.profile,
         };
      }
      case DELETE_POST: {
         return {
            ...state,
            posts: state.posts.filter(p => p.id !== action.postId),
         };
      }
      case SAVE_PHOTO_SUCCESS: {
         return {
            ...state,
            profile: { ...state.profile, photos: action.photos },
         };
      }
      default:
         return state;
   }
};

export const addPostActionCreator = newPostText => ({ type: ADD_POST, newPostText });
export const setUserProfile = profile => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = status => ({ type: SET_USER_STATUS, status });
export const deletePost = postId => ({ type: DELETE_POST, postId });
export const savePhotoSuccess = photos => ({ type: SAVE_PHOTO_SUCCESS, photos });

export const getUserProfile = userId => async dispatch => {
   let responce = await profileAPI.getUserProfile(userId);
   dispatch(setUserProfile(responce.data));
};

export const getUserStatus = userId => async dispatch => {
   let responce = await profileAPI.getUserStatus(userId);
   dispatch(setUserStatus(responce.data));
};

export const updateUserStatus = status => async dispatch => {
   let responce = await profileAPI.updateUserStatus(status);

   if (responce.data.resultCode === 0) {
      dispatch(setUserStatus(status));
   }
};

export const savePhoto = file => async dispatch => {
   let responce = await profileAPI.savePhoto(file);

   if (responce.data.resultCode === 0) {
      dispatch(savePhotoSuccess(responce.data.data.photos));
   }
};

export const saveProfile = profile => async (dispatch, getState) => {
   const userId = getState().auth.userId;
   const responce = await profileAPI.saveProfile(profile);

   if (responce.data.resultCode === 0) {
      dispatch(getUserProfile(userId));
   }
};

export default profileReducer;
