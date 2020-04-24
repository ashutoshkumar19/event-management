import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { getEvents, deleteEvent } from '../actions/event.action';

const EventList = ({ isAuthenticated, user, events, getEvents, deleteEvent }) => {
  const { name, email } = user;

  useEffect(() => {
    getEvents();
  }, []);

  const onDeleteEvent = (event_id) => {
    deleteEvent(event_id);
    getEvents();
  };

  return (
    <div className='event-list-container'>
      <div className='heading'>
        <p>My Events</p>
      </div>
      <div className='accordion' id='event-list-box'>
        {events.length > 0 ? (
          events.map((event, index) => (
            <div className='card event-list-item' key={index}>
              <div className='card-header' id={`event-list-item-${index}`}>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target={`#collapse-${index}`}
                    aria-expanded='true'
                    aria-controls='collapseOne'
                  >
                    <span class='mr-2'>></span>
                    {event.title}
                  </button>
                </h2>
              </div>

              <div
                id={`collapse-${index}`}
                className='collapse'
                aria-labelledby={`event-list-item-${index}`}
                data-parent='#event-list-box'
              >
                <div className='card-body'>
                  <ul>
                    <li>
                      <span>Organizer: </span> {event.organizer}
                    </li>
                    {event.description && (
                      <li>
                        <span>Description: </span> {event.description}
                      </li>
                    )}
                    <li>
                      <span>Venue: </span> {event.venue}
                    </li>
                    <li>
                      <span>From: </span>
                      <Moment format='DD-MMM-YYYY'>{event.date_from}</Moment>
                    </li>
                    {event.date_to && (
                      <li>
                        <span>To: </span>
                        <Moment format='DD-MMM-YYYY'>{event.date_to}</Moment>
                      </li>
                    )}
                  </ul>
                  <button
                    className='btn btn-sm btn-danger ml-auto delete-btn'
                    onClick={(e) => onDeleteEvent(event._id)}
                  >
                    Delete Event
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div class='alert alert-warning' role='alert'>
            No events ! Please create an event.
          </div>
        )}
      </div>
    </div>
  );
};

EventList.propTypes = {
  getEvents: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  events: state.event.events,
});

export default connect(mapStateToProps, { getEvents, deleteEvent })(EventList);
