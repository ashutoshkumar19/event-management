import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login, register } from '../actions/auth.action';

const validateName = (name) => {
  var re = /^[a-zA-Z ]{2,30}$/;
  return re.test(String(name).toLowerCase());
};

const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const LoginSignup = ({ login, register, isAuthenticated }) => {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });
  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [loginFormError, setLoginFormError] = useState({ email: false });
  const [registerFormError, setRegisterFormError] = useState({
    name: false,
    email: false,
    password: false,
    password2: false,
  });

  const onLoginFormDataChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    setLoginFormError({ ...loginFormError, [e.target.name]: false });
  };
  const onRegisterFormDataChange = (e) => {
    setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
    setRegisterFormError({ ...registerFormError, [e.target.name]: false });
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginFormData;
    let isError = false;
    if (!validateEmail(email)) {
      setLoginFormError((prevState) => ({ ...prevState, email: true }));
      isError = true;
    }
    if (!isError) {
      login({ email, password });
    }
  };
  const onRegisterSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password2 } = registerFormData;
    let isError = false;
    if (!validateName(name)) {
      setRegisterFormError((prevState) => ({ ...prevState, name: true }));
      isError = true;
    }
    if (!validateEmail(email)) {
      setRegisterFormError((prevState) => ({ ...prevState, email: true }));
      isError = true;
    }
    if (password.length < 6) {
      setRegisterFormError((prevState) => ({ ...prevState, password: true }));
      isError = true;
    }
    if (password !== password2 || password2.length === 0) {
      setRegisterFormError((prevState) => ({ ...prevState, password2: true }));
      isError = true;
    }
    if (!isError) {
      console.log(name, email, password);

      register({ name, email, password });
    }
  };

  // Redirect if Logged In
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='container login-container'>
      <div className='row'>
        {/* Login Form */}
        <div className='col-md-6 login-form-1'>
          <div className='heading'>
            <p>Login</p>
          </div>
          <form onSubmit={(e) => onLoginSubmit(e)}>
            <div className='form-group'>
              <label>
                Email <span>*</span>
              </label>
              <input
                type='email'
                name='email'
                className={`form-control ${loginFormError.email && `is-invalid`}`}
                placeholder='Your Email *'
                value={loginFormData.email}
                onChange={onLoginFormDataChange}
              />
              <div className='invalid-feedback'>Please enter a valid email</div>
            </div>
            <div className='form-group'>
              <label>
                Password <span>*</span>
              </label>
              <input
                type='password'
                name='password'
                className='form-control'
                placeholder='Your Password *'
                value={loginFormData.password}
                onChange={onLoginFormDataChange}
              />
            </div>
            <div className='form-group'>
              <button type='submit' className='btnSubmit'>
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Register Form */}
        <div className='col-md-6 login-form-2'>
          <div className='heading'>
            <p>Register</p>
          </div>
          <form onSubmit={(e) => onRegisterSubmit(e)}>
            <div className='form-group'>
              <label>
                Name <span>*</span>
              </label>
              <input
                type='text'
                name='name'
                className={`form-control ${registerFormError.name && `is-invalid`}`}
                placeholder='Your Name *'
                value={registerFormData.name}
                onChange={onRegisterFormDataChange}
              />
              <div className='invalid-feedback'>Please enter a valid name</div>
            </div>
            <div className='form-group'>
              <label>
                Email <span>*</span>
              </label>
              <input
                type='email'
                name='email'
                className={`form-control ${registerFormError.email && `is-invalid`}`}
                placeholder='Your Email *'
                value={registerFormData.email}
                onChange={onRegisterFormDataChange}
              />
              <div className='invalid-feedback'>Please enter a valid email</div>
            </div>
            <div className='form-group'>
              <label>
                Password <span>*</span>
              </label>
              <input
                type='password'
                name='password'
                className={`form-control ${registerFormError.password && `is-invalid`}`}
                placeholder='Enter Password *'
                value={registerFormData.password}
                onChange={onRegisterFormDataChange}
              />
              <div className='invalid-feedback'>
                Password must be atleast 6 characters
              </div>
            </div>
            <div className='form-group'>
              <label>
                Verify Password <span>*</span>
              </label>
              <input
                type='password'
                name='password2'
                className={`form-control ${registerFormError.password2 && `is-invalid`}`}
                placeholder='Enter Password again *'
                value={registerFormData.password2}
                onChange={onRegisterFormDataChange}
              />
              <div className='invalid-feedback'>Passwords do not match</div>
            </div>
            <div className='form-group'>
              <button type='submit' className='btnSubmit'>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

LoginSignup.propTypes = {
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, register })(LoginSignup);
// export default LoginSignup;
