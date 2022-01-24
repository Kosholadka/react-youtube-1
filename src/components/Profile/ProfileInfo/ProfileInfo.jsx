import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader';
import yes from '../../../assets/images/yes.png';
import no from '../../../assets/images/no.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({ profile, status, updateUserStatus }) => {
   if (!profile) {
      return <Preloader />;
   }

   return (
      <div>
         <div className={s.descriptionBlock}>
            <img src={profile.photos.large} />
            <div>Name: {profile.fullName}</div>
            <div>About me: {profile.aboutMe}</div>
            <div>
               Looking for a job:{' '}
               {profile.lookingForAJob === true ? (
                  <img src={yes} style={{ width: '20px' }} />
               ) : (
                  <img src={no} style={{ width: '20px' }} />
               )}
               ({profile.lookingForAJobDescription})
            </div>
            <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus} />
         </div>
      </div>
   );
};

export default ProfileInfo;
