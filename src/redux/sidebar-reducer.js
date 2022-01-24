let initialState = {
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
};

const sidebarReducer = (state = initialState, action) => {
   return state;
};

export default sidebarReducer;
