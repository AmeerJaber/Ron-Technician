import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { emailSignInStart, googleSignInStart } from './../../redux/User/user.actions';
import validator from 'validator';
import loginImg from '../../assets/login.jpg';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
});
var timeoutID;

const SignIn = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState();

  let validate = () => {
  setEmailError("");
  setPasswordError("");
  setError("");
    if (!validator.isEmail(email)) {
      setEmailError("invalid email");
    }

    if (!email) {
      setEmailError("Please enter an Email");
    }

    if (password.length < 8 ||  password.length > 20) {
      setPasswordError("Password lenth must be from 8 to 20");
    }

    if (!password) {
      setPasswordError("Please enter a password");
    }
  };


    useEffect(() => {
      if (currentUser) {
        resetForm();
        history.push('/');
        clearTimeout(timeoutID);
      }
     clearTimeout(timeoutID);
    }, [currentUser]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    validate();
    if (!emailError && !passwordError) {
      dispatch(emailSignInStart({ email, password }));
      timeoutID=setTimeout(() => {
        setError('Invaild email or password');
      }, "7000")
    }
  }

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  }

  const configAuthWrapper = {
    headline: 'כניסה'
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrapfetc">
        <div className='wrap'>
        <div className="image">
              <img src={loginImg} />
            </div>
        <form onSubmit={handleSubmit}>

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />
          <div style={{ fontSize: 14, color: "red" }}>{emailError}</div>

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={e => setPassword(e.target.value)}
          />
          <div style={{ fontSize: 14, color: "red" }}>{passwordError}</div>

          <div style={{ fontSize: 14, color: "red" }}>{error}</div>
          <center>
          <div className="footer">
          
          <Button type="submit"className="btn">
            כניסה
          </Button>
          </div>
          <div className="socialSignin">
            <div className="row">
            <div className="footer">
              <Button onClick={handleGoogleSignIn} className="btn">
                Google כניסה דרך חשבון
              </Button>
              </div>
            </div>
          </div></center>

          <div className="links">
            <Link to="/registration">
              הרשמה
            </Link>
            {` | `}
            <Link to="/recovery">
              איפוס סיסמה
            </Link>
          </div>
        </form>
        </div>
        </div>
     </AuthWrapper>
  );
}

export default SignIn;
