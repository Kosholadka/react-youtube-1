import profileReducer, { addPostActionCreator, deletePost } from './profile-reducer';

let state = {
   posts: [
      { id: 1, message: 'Hi, how are you?', likesCount: 15 },
      { id: 2, message: "It's my first post", likesCount: 20 },
      { id: 3, message: "It's my second post", likesCount: 21 },
      { id: 4, message: "It's my third post", likesCount: 18 },
   ],
};

test('posts should be increased', () => {
   // 1. test data
   let action = addPostActionCreator('it-kamasutra');
   // 2. action
   let newState = profileReducer(state, action);
   // 3. expectation
   expect(newState.posts.length).toBe(5);
});

test('added post should be correct', () => {
   // 1. test data
   let action = addPostActionCreator('it-kamasutra');
   // 2. action
   let newState = profileReducer(state, action);
   // 3. expectation
   expect(newState.posts[4].message).toBe('it-kamasutra');
});

test('posts should be decrement', () => {
   // 1. test data
   let action = deletePost(1);
   // 2. action
   let newState = profileReducer(state, action);
   // 3. expectation
   expect(newState.posts.length).toBe(3);
});

test(`posts should't be changed if postId is incorrect`, () => {
   // 1. test data
   let action = deletePost(1000);
   // 2. action
   let newState = profileReducer(state, action);
   // 3. expectation
   expect(newState.posts.length).toBe(4);
});