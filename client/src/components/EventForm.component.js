import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEvent } from '../actions/event.action';

const validateDate = (date) => {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var newDate = new Date(date);
  if (newDate < today) {
    return false;
  } else {
    return true;
  }
};
const compareDates = (date1, date2) => {
  var newDate1 = new Date(date1);
  var newDate2 = new Date(date2);
  if (newDate1 >= newDate2) {
    return true;
  } else {
    return false;
  }
};

const EventForm = ({ isAuthenticated, user, addEvent }) => {
  const { name, email } = user;

  const [formData, setFormData] = useState({
    organizer: '',
    title: '',
    description: '',
    venue: '',
    date_from: '',
    date_to: '',
  });

  const [formError, setFormError] = useState({
    organizer: false,
    title: false,
    description: false,
    venue: false,
    date_from: false,
    date_to: false,
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: false });
  };

  const onEventSubmit = (e) => {
    e.preventDefault();
    const { organizer, title, description, venue, date_from, date_to } = formData;
    let isError = false;
    if (organizer.length === 0) {
      setFormError((prevState) => ({ ...prevState, organizer: true }));
      isError = true;
    }
    if (title.length === 0) {
      setFormError((prevState) => ({ ...prevState, title: true }));
      isError = true;
    }
    if (venue.length === 0) {
      setFormError((prevState) => ({ ...prevState, venue: true }));
      isError = true;
    }
    if (date_from.length === 0 || !validateDate(date_from)) {
      setFormError((prevState) => ({ ...prevState, date_from: true }));
      isError = true;
    }
    if (date_to.length !== 0 && !compareDates(date_to, date_from)) {
      setFormError((prevState) => ({ ...prevState, date_to: true }));
      isError = true;
    }
    if (!isError) {
      console.log(organizer, title, description, venue, date_from, date_to);
      addEvent({ organizer, title, description, venue, date_from, date_to });
      setFormData({
        organizer: '',
        title: '',
        description: '',
        venue: '',
        date_from: '',
        date_to: '',
      });
    }
  };
  return (
    <Fragment>
      <div className='heading'>
        <p>Create Event</p>
      </div>
      <form onSubmit={(e) => onEventSubmit(e)}>
        <div className='form-group'>
          <label>
            Organizer <span>*</span>
          </label>
          <input
            type='text'
            name='organizer'
            className={`form-control ${formError.organizer && `is-invalid`}`}
            placeholder='Enter name of organizer'
            value={formData.organizer}
            onChange={onChange}
          />
          <div className='invalid-feedback'>Please enter a valid name</div>
        </div>
        <div className='form-group'>
          <label>
            Title <span>*</span>
          </label>
          <input
            type='text'
            name='title'
            className={`form-control ${formError.title && `is-invalid`}`}
            placeholder='Enter event title'
            value={formData.title}
            onChange={onChange}
          />
          <div className='invalid-feedback'>Please enter a title</div>
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea
            type='text'
            name='description'
            className={`form-control `}
            placeholder='Enter event description'
            value={formData.description}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label>
            Venue <span>*</span>
          </label>
          <input
            type='text'
            name='venue'
            className={`form-control ${formError.venue && `is-invalid`}`}
            placeholder='Enter venue'
            value={formData.venue}
            onChange={onChange}
          />
          <div className='invalid-feedback'>Please enter a venue</div>
        </div>
        <div className='form-row'>
          <div className='form-group col-md-6 col-sm-12'>
            <label>
              From <span>*</span>
            </label>
            <input
              type='date'
              name='date_from'
              className={`form-control ${formError.date_from && `is-invalid`}`}
              placeholder='Enter starting date'
              value={formData.date_from}
              onChange={onChange}
            />
            <div className='invalid-feedback'>Please enter a valid date</div>
          </div>
          <div className='form-group col-md-6 col-sm-12'>
            <label>To</label>
            <input
              type='date'
              name='date_to'
              className={`form-control ${formError.date_to && `is-invalid`}`}
              placeholder='Enter ending date'
              value={formData.date_to}
              onChange={onChange}
            />
            <div className='invalid-feedback'>Please enter a valid date</div>
          </div>
        </div>

        <div className='form-group'>
          <button type='submit' className='btn btn-primary btnSubmit'>
            Add Event
          </button>
        </div>
      </form>
    </Fragment>
  );
};

EventForm.propTypes = {
  addEvent: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { addEvent })(EventForm);
