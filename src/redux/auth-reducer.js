import { stopSubmit } from 'redux-form';
import { authAPI } from '../api/api';

const SET_USER_DATA = 'auth/SET_USER_DATA';

let initialState = {
   messages: [],
   userId: null,
   email: null,
   login: null,
   photo: null,
   isAuth: false,
};

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_USER_DATA: {
         return {
            ...state,
            ...action.payload,
         };
      }
      default:
         return state;
   }
};

export const setAuthUserData = ({ userId, email, login, photo, isAuth }) => ({
   type: SET_USER_DATA,
   payload: {
      userId,
      email,
      login,
      photo,
      isAuth,
   },
});

export const getAuthUserData = () => async dispatch => {
   let responce = await authAPI.getAuth();

   if (responce.data.resultCode === 0) {
      let { id: userId, email, login, photo } = responce.data.data;
      dispatch(
         setAuthUserData({
            userId,
            email,
            login,
            photo,
            isAuth: true,
         }),
      );
   }
};

export const login = (email, password, rememberMe) => async dispatch => {
   let responce = await authAPI.login(email, password, rememberMe);

   if (responce.data.resultCode === 0) {
      dispatch(getAuthUserData());
   } else {
      let message = responce.data.messages.length > 0 ? responce.data.messages[0] : 'Some error';
      dispatch(stopSubmit('login', { _error: message }));
   }
};

export const logout = () => async dispatch => {
   let responce = await authAPI.logout();
   
   if (responce.data.resultCode === 0) {
      dispatch(
         setAuthUserData({
            userId: null,
            email: null,
            login: null,
            photo: null,
            isAuth: false,
         }),
      );
   }
};

export default authReducer;
