import axios from 'axios';
import { setAlert } from './alert.action';
import {
  GET_EVENTS,
  GET_EVENT,
  EVENT_ERROR,
  UPDATE_ATTENDEES,
  DELETE_EVENT,
  ADD_EVENT,
  CLEAR_EVENT,
} from './types';

// Get all Events
export const getEvents = () => async (dispatch) => {
  try {
    const res = await axios.get('/event');
    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Event
export const addEvent = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/event', formData, config);
    dispatch({
      type: ADD_EVENT,
      payload: res.data,
    });
    dispatch(setAlert('Event Created', 'success'));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Event
export const deleteEvent = (event_id) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`/event/${event_id}`);
      dispatch({
        type: DELETE_EVENT,
        payload: event_id,
      });
      dispatch(getEvents());
      dispatch(setAlert('Event Removed', 'success'));
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Get single Event
export const getEvent = (event_id) => async (dispatch) => {
  try {
    // dispatch({
    //   type: CLEAR_EVENT,
    // });
    const res = await axios.get(`/event/${event_id}`);
    dispatch({
      type: GET_EVENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// // Add Attendee
// export const addAttendee = (event_id) => async (dispatch) => {
//   try {
//     const res = await axios.put(`/event/attendee/${event_id}`);
//     dispatch({
//       type: UPDATE_ATTENDEES,
//       payload: { event_id, attendees: res.data },
//     });
//   } catch (err) {
//     dispatch({
//       type: EVENT_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// Remove Attendee
// export const removeAttendee = (event_id) => async (dispatch) => {
//   try {
//     const res = await axios.put(`/event/attendee/${event_id}`);
//     dispatch({
//       type: UPDATE_ATTENDEES,
//       payload: { event_id, attendees: res.data },
//     });
//   } catch (err) {
//     dispatch({
//       type: EVENT_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };
