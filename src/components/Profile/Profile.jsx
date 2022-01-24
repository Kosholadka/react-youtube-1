import { Redirect } from 'react-router-dom';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = props => {
   if (!props.isAuth) return <Redirect to={'/login'} />;
   return (
      <div>
         <ProfileInfo profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus} />
         <MyPostsContainer />
      </div>
   );
};

export default Profile;
