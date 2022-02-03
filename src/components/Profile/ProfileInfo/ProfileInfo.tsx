import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png';
import { useState } from 'react';
import ProfileDataReduxForm from './ProfileDataForm';

const ProfileInfo = ({ profile, status, updateUserStatus, isOwner, savePhoto, saveProfile }) => {
   let [editMode, setEditMode] = useState(false);

   if (!profile) {
      return <Preloader />;
   }

   const onMainPhotoSelected = e => {
      if (e.target.files.length) {
         savePhoto(e.target.files[0]);
      }
   };

   const onSubmit = formData => {
      saveProfile(formData);
      setEditMode(false);
   };

   return (
      <div>
         <div className={s.descriptionBlock}>
            <img src={profile.photos.large || userPhoto} />
            {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
            {editMode ? (
               <ProfileDataReduxForm initialValues={profile} onSubmit={onSubmit} />
            ) : (
               <ProfileData
                  profile={profile}
                  isOwner={isOwner}
                  goToEditMode={() => {
                     setEditMode(true);
                  }}
               />
            )}
            <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus} />
         </div>
      </div>
   );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
   return (
      <div>
         {isOwner && (
            <div>
               <button onClick={goToEditMode}>edit</button>
            </div>
         )}
         <div>
            <b>Name: </b>
            {profile.fullName}
         </div>
         <div>
            <b>About me: </b>
            {profile.aboutMe}
         </div>
         <div>
            <b>Looking for a job: </b>
            {profile.lookingForAJob ? 'yes' : 'no'}
         </div>
         {profile.lookingForAJob && (
            <div>
               <b>My professional skills: </b>
               {profile.lookingForAJobDescription}
            </div>
         )}
         <div>
            <b>Contacts: </b>
            {Object.keys(profile.contacts).map(key => {
               return <Contacts key={key} contactsTitle={key} contactsValue={profile.contacts[key]} />;
            })}
         </div>
      </div>
   );
};

const ProfileDataForm = ({ profile }) => {
   return <div>Form</div>;
};

const Contacts = ({ contactsTitle, contactsValue }) => {
   return (
      <div className={s.contacts}>
         <b>{contactsTitle}: </b>
         {contactsValue}
      </div>
   );
};

export default ProfileInfo;
