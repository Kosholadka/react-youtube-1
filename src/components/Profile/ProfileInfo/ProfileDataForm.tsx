import { Field, reduxForm } from 'redux-form';
import { Input, Textarea } from '../../common/FormsControls/FormsControls';

const ProfileDataForm = ({ handleSubmit }) => {
   return (
      <form onSubmit={handleSubmit}>
         <div>
            <button onClick={() => {}}>save</button>
         </div>
         <div>
            <b>Full name: </b>
            <Field placeholder="Full name" name="fullName" component={Input} />
         </div>
         <div>
            <b>About me: </b>
            <Field placeholder="About me" name="aboutMe" component={Textarea} />
         </div>
         <div>
            <b>Looking for a job: </b>
            <Field type="checkbox" name="lookingForAJob" component={Input} />
         </div>
         <div>
            <b>My professional skills: </b>
            <Field placeholder="My professional skills" name="lookingForAJobDescription" component={Textarea} />
         </div>
         {/* <div>
            <b>Contacts: </b>
            {Object.keys(profile.contacts).map(key => {
               return <Contacts key={key} contactsTitle={key} contactsValue={profile.contacts[key]} />;
            })}
         </div> */}
      </form>
   );
};

const ProfileDataReduxForm = reduxForm({ form: 'profile-data' })(ProfileDataForm);

export default ProfileDataReduxForm;
