import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { emailSignInStart, googleSignInStart } from './../../redux/User/user.actions';
import validator from 'validator';

import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
});

const SignIn = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState();
  var timeoutID;
  const [count, setCount] = useState(0);
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
    clearTimeout(timeoutID);
    if (currentUser) {
      resetForm();
      history.push('/');
    }
    return () => clearTimeout(timeoutID);
  }, [count,currentUser]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleSubmit = e => {
    setCount(count + 1);
    e.preventDefault();
    validate();
    if (!emailError && !passwordError) {
      dispatch(emailSignInStart({ email, password }));
      timeoutID=setTimeout(function () {
        setError('Invaild email or password');
    }, 5000);
    }
  }

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  }

  const configAuthWrapper = {
    headline: 'LogIn'
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrapfetc">
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
          <Button type="submit">
            LogIn
          </Button>

          <div className="socialSignin">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>
                Sign in with Google
              </Button>
            </div>
          </div>

          <div className="links">
            <Link to="/registration">
              Register
            </Link>
            {` | `}
            <Link to="/recovery">
              Reset Password
            </Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;
