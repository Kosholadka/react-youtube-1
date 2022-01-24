const SEND_MESSAGE = 'dialogs/SEND-MESSAGE';
const DELETE_MESSAGE = 'dialogs/DELETE_MESSAGE';

let initialState = {
   messages: [
      { id: 1, message: 'Hi' },
      { id: 2, message: 'Hello' },
      { id: 3, message: 'Yo' },
   ],
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
};

const dialogsReducer = (state = initialState, action) => {
   switch (action.type) {
      case SEND_MESSAGE: {
         let text = action.newMessageElement;
         return {
            ...state,
            messages: [...state.messages, { id: 4, message: text }],
         };
      }
      case DELETE_MESSAGE: {
         return {
            ...state,
            messages: state.messages.filter(m => m.id !== action.messageId),
         };
      }
      default:
         return state;
   }
};

export const sendMessageActionCreator = newMessageElement => ({ type: SEND_MESSAGE, newMessageElement });
export const deleteMessage = messageId => ({ type: DELETE_MESSAGE, messageId });

export default dialogsReducer;
