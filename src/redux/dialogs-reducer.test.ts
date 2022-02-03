import dialogsReducer, { deleteMessage, sendMessageActionCreator } from './dialogs-reducer';

let state = {
   messages: [
      { id: 1, message: 'Hi' },
      { id: 2, message: 'Hello' },
      { id: 3, message: 'Yo' },
   ],
};

test('messages should be encreased', () => {
   let action = sendMessageActionCreator('How are you?');
   let newState = dialogsReducer(state, action);
   expect(newState.messages.length).toBe(4);
});

test('messages should be decrement', () => {
   let action = deleteMessage(2)
   let newState = dialogsReducer(state, action)
   expect(newState.messages.length).toBe(2)
});
