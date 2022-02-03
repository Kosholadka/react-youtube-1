import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import s from '../common/FormsControls/FormsControls.module.css';

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
   return (
      <form onSubmit={handleSubmit}>
         <div>
            <Field placeholder="Login" name="email" component={Input} validate={[required]} />
         </div>
         <div>
            <Field placeholder="Password" type="password" name="password" component={Input} validate={[required]} />
         </div>
         <div>
            <Field type="checkbox" name="rememberMe" component={Input} />
            remember me
         </div>

         {captchaUrl && <img src={captchaUrl} />}
         {captchaUrl && (
            <Field placeholder="Captcha" name="captcha" component={Input} validate={[required]} />
         )}

         {error && <div className={s.formSummaryError}>{error}</div>}
         <div>
            <button>Login</button>
         </div>
         <div></div>
      </form>
   );
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = props => {
   const onSubmit = formData => {
      props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
   };

   if (props.isAuth) return <Redirect to={'/profile'} />;

   return (
      <div>
         <h1>LOGIN</h1>
         <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
      </div>
   );
};

const mapStateToProps = state => ({
   isAuth: state.auth.isAuth,
   captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);
