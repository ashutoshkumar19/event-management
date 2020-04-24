import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import EventForm from './EventForm.component';
import EventList from './EventList.component';

const Dashboard = ({ isAuthenticated }) => {
  // Redirect if Logged In
  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <Navbar />
      <div className='row p-0 m-0 text-left dashboard-container'>
        <div className='col-md-6 col-sm-12  m-0  event-form-container'>
          <EventForm />
        </div>
        <div className='col-md-6 col-sm-12 m-0 '>
          <EventList />
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Dashboard);
