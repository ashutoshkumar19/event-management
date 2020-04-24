import React, { Component, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../actions/auth.action';

const Navbar = ({ isAuthenticated, user, logout }) => {
  const { name, email } = user;
  const onLogout = () => {
    logout();
  };
  useEffect(() => {
    console.log(name);
  }, []);

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='navbar-brand'>Event Management</div>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        {/* <ul className='navbar-nav mr-auto'></ul> */}
        <div className='nav-item ml-auto mr-4'>
          <p className='p-0 m-0 username'>{name}</p>
        </div>
        <button className='btn btn-outline-success my-2 my-sm-0 mr-3' onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object.isRequired,
  // auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
