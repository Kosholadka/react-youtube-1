import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10);

const MyPostForm = props => {
   return (
      <form onSubmit={props.handleSubmit}>
         <div>
            <Field
               placeholder="Type your text"
               name="newPostText"
               component={Textarea}
               validate={[required, maxLength10]}
            />
         </div>
         <div>
            <button>Add post</button>
         </div>
      </form>
   );
};

const MyPostReduxForm = reduxForm({ form: 'post' })(MyPostForm);

const MyPosts = props => {
   console.log("RENDER")
   let postsElements = props.posts.map(p => <Post message={p.message} key={p.id} likesCount={p.likesCount} />);

   const addNewPost = values => {
      props.addPost(values.newPostText);
   };

   return (
      <div className={s.postsBlock}>
         <h3>My posts</h3>
         <MyPostReduxForm onSubmit={addNewPost} />
         <div className={s.posts}></div>
         {postsElements}
      </div>
   );
};

export default MyPosts;
