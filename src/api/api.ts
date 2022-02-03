import axios from 'axios';

const instance = axios.create({
   withCredentials: true,
   headers: { 'API-KEY': '8c02c6af-5022-4beb-bf32-7755b2eca044' },
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export const usersAPI = {
   requestUsers(currentPage = 1, pageSize = 10) {
      return instance.get(`users?page=${currentPage}&count=${pageSize}`);
   },
};

export const followUnfollowAPI = {
   follow(id) {
      return instance.post(`follow/${id}`);
   },
   unfollow(id) {
      return instance.delete(`follow/${id}`);
   },
};

export const authAPI = {
   getAuth() {
      return instance.get(`auth/me`);
   },
   login(email, password, rememberMe, captcha = null) {
      return instance.post(`auth/login`, { email, password, rememberMe, captcha });
   },
   logout() {
      return instance.delete(`auth/login`);
   },
};

export const securityAPI = {
   getCaptchaUrl() {
      return instance.get(`security/get-captcha-url`);
   },
};

export const profileAPI = {
   getUserProfile(userId) {
      return instance.get(`profile/` + userId);
   },
   getUserStatus(userId) {
      return instance.get(`profile/status/` + userId);
   },
   updateUserStatus(status) {
      return instance.put(`profile/status`, { status: status });
   },
   savePhoto(photoFile) {
      const formData = new FormData();
      formData.append('image', photoFile);
      return instance.put(`profile/photo`, formData, {
         headers: {
            'Content-type': 'multipart/form-data',
         },
      });
   },
   saveProfile(profile) {
      return instance.put(`profile`, profile);
   },
};
