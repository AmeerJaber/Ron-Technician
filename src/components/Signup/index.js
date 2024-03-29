import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { signUpUserStart } from './../../redux/User/user.actions';
import validator from 'validator';
import loginImg from '../../assets/login.jpg';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr
});

const Signup = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [displayName, setDisplayName] = useState('');
  const [displayNameError, setDisplayNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [error, setError] = useState([]);
  var timeoutID;
  
  let validate = () => {
    setDisplayNameError("");
    setEmailError("");
    setPasswordError("");
    setPasswordConfirmError("");

    if (!displayName) {
      setDisplayNameError("Please enter username");
    }

    if (!validator.isEmail(email)) {
      setEmailError("invalid email");
    }

    if (!email) {
      setEmailError("Please enter an Email");
    }

    if (password.length < 8 ||  password.length > 20) {
      setPasswordError("Password lenth must be from 8 to 20");
    }

    if (confirmPassword.length < 8 ||  confirmPassword.length > 20) {
      setPasswordConfirmError("Password lenth must be from 8 to 20");
    }


    if (!password) {
      setPasswordError("Please enter a password");
    }

    if (!confirmPassword) {
      setPasswordConfirmError("Please enter password confirmation");
    }

    if(password!==confirmPassword){
      setPasswordConfirmError("Password dosen't match");
    }
  };


  useEffect(() => {
    if (currentUser) {
      reset();
      history.push('/');
      clearTimeout(timeoutID);
    }
    clearTimeout(timeoutID);
  }, [currentUser]);

  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    validate();
    if (!displayNameError && !emailError && !passwordError && !passwordConfirmError) {
    dispatch(signUpUserStart({
      displayName,
      email,
      password,
      confirmPassword
    }));
    timeoutID=setTimeout(() => {
      setError('User already exists');
    }, "4000")
  }
  }

  const configAuthWrapper = {
    headline: 'הרשמה'
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
      <div className='wrap'>
      <div className="image">
              <img src={loginImg} />
            </div>
        <form onSubmit={handleFormSubmit}>

          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full name"
            handleChange={e => setDisplayName(e.target.value)}
          />

          <div style={{ fontSize: 14, color: "red" }}>{displayNameError}</div>

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

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={e => setConfirmPassword(e.target.value)}
          />

          <div style={{ fontSize: 14, color: "red" }}>{passwordConfirmError}</div>
          <div style={{ fontSize: 14, color: "red" }}>{error}</div>
          <div className="footer"><center>
          <Button type="submit" className="btn">
            הרשמה
          </Button>
          </center> </div>
        </form>

        <div className="links">
          <Link to="/login">
            כניסה
          </Link>
          {` | `}
          <Link to="/recovery">
            איפוס סיסמה
            </Link>
        </div>
      </div>
      </div>
    </AuthWrapper>
  );
}

export default Signup;
