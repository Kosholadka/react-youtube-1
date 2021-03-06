import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../api/api';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
   messages: [],
   userId: null,
   email: null,
   login: null,
   photo: null,
   isAuth: false,
   captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_USER_DATA:
      case GET_CAPTCHA_URL_SUCCESS:
         return {
            ...state,
            ...action.payload,
         };
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

export const getCaptchaUrlSuccess = captchaUrl => ({
   type: GET_CAPTCHA_URL_SUCCESS,
   payload: {
      captchaUrl,
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

export const login = (email, password, rememberMe, captcha) => async dispatch => {
   let responce = await authAPI.login(email, password, rememberMe, captcha);

   if (responce.data.resultCode === 0) {
      dispatch(getAuthUserData());
   } else {
      if (responce.data.resultCode === 10) {
         dispatch(getCaptchaUrl());
      }
      let message = responce.data.messages.length > 0 ? responce.data.messages[0] : 'Some error';
      dispatch(stopSubmit('login', { _error: message }));
   }
};

export const getCaptchaUrl = () => async dispatch => {
   const responce = await securityAPI.getCaptchaUrl();
   const captchaUrl = responce.data.url;
   dispatch(getCaptchaUrlSuccess(captchaUrl));
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
