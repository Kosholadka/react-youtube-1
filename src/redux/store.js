import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';

let store = {
   _state: {
      profilePage: {
         posts: [
            { id: 1, message: 'Hi, how are you?', likesCount: 15 },
            { id: 2, message: "It's my first post", likesCount: 20 },
            { id: 3, message: "It's my second post", likesCount: 21 },
            { id: 4, message: "It's my third post", likesCount: 18 },
         ],
         newPostText: 'it-kamasutra.com',
      },
      dialogsPage: {
         messages: [
            { id: 1, message: 'Hi' },
            { id: 2, message: 'Hello' },
            { id: 3, message: 'Yo' },
         ],
         newMessageText: 'hello_everyone',
         dialogs: [
            {
               id: 1,
               name: 'Katya',
               ava: <img src="https://www.meme-arsenal.com/memes/2fea27e63fbef9204cb51022ededbca9.jpg"></img>,
            },
            {
               id: 2,
               name: 'Makar',
               ava: (
                  <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg"></img>
               ),
            },
            {
               id: 3,
               name: 'Vitaliy',
               ava: <img src="https://whatsism.com/uploads/posts/2018-07/1530546770_rmk_vdjbx10.jpg"></img>,
            },
            {
               id: 4,
               name: 'Sveta',
               ava: <img src="https://trikky.ru/wp-content/blogs.dir/1/files/2016/12/Avatar_1481048766783.png"></img>,
            },
            {
               id: 5,
               name: 'Valera',
               ava: (
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYPPkHLVRvoyZDWFncXHnqQBrzqJnUilYZrw&usqp=CAU"></img>
               ),
            },
            {
               id: 6,
               name: 'Kuzya',
               ava: <img src="https://pixelbox.ru/wp-content/uploads/2020/12/ava-twitch-99-300x300.jpg"></img>,
            },
         ],
      },
      sidebar: {
         friends: [
            {
               id: 1,
               name: 'Kobi',
               ava: (
                  <img src="https://pre-party.com.ua/uploads/2017/January/coby%20cat/coby%20cat%20foto%20%D1%81%D1%83%D0%BF%D0%B5%D1%80%20%D0%BA%D0%BE%D1%82%20%D0%BA%D0%BE%D1%88%D0%BA%D0%B8%20%D0%B3%D0%BE%D0%BB%D1%83%D0%B1%D0%BE%D0%B3%D0%BB%D0%B0%D0%B7%D1%8B%D0%B9%20%D0%BA%D0%BE%D1%82%20%D0%B1%D0%B5%D0%BB%D0%BE%D1%81%D0%BD%D0%B5%D0%B6%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BE%D1%82%20%D0%B7%D0%B2%D0%B5%D0%B7%D0%B4%D0%B0%20%D0%B8%D0%BD%D1%81%D1%82%D0%B0%D0%B3%D1%80%D0%B0%D0%BC%205.jpg"></img>
               ),
            },
            {
               id: 2,
               name: 'Khosya',
               ava: (
                  <img src="https://avatars.mds.yandex.net/get-zen_doc/1679483/pub_5dcda45d8ddf2d1f5dfc03f4_5dd7c2810d13017d4ff74260/scale_1200"></img>
               ),
            },
            {
               id: 3,
               name: 'Barni',
               ava: <img src="https://bugaga.ru/uploads/posts/2015-10/1445508068_vechno-rzhuschiy-barni-1.jpg"></img>,
            },
         ],
      },
   },
   _callSubscriber() {
      console.log('State changed');
   },

   getState() {
      debugger;
      return this._state;
   },
   subscribe(observer) {
      this._callSubscriber = observer;
   },

   dispatch(action) {
      this._state.profilePage = profileReducer(this._state.profilePage, action);
      this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
      this._state.sidebar = sidebarReducer(this._state.sidebar, action);

      this._callSubscriber(this._state);
   },
};

export default store;
window.store = store;
