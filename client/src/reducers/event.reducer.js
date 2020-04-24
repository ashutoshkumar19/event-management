import {
  GET_EVENTS,
  GET_EVENT,
  EVENT_ERROR,
  DELETE_EVENT,
  ADD_EVENT,
  CLEAR_EVENTS,
  UPDATE_ATTENDEES,
} from '../actions/types';

const initialState = {
  events: [],
  event: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        event: null,
        loading: false,
      };

    case GET_EVENT:
      return {
        ...state,
        // events: [],
        event: payload,
        loading: false,
      };

    case ADD_EVENT:
      return {
        ...state,
        events: [payload, ...state.events],
        loading: false,
      };

    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event._id !== payload),
        loading: false,
      };

    case CLEAR_EVENTS:
      return {
        ...state,
        events: [],
        loading: false,
      };

    case EVENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    // case UPDATE_ATTENDEES:
    //   return {
    //     ...state,
    //     events: state.events.map((event) =>
    //       event._id === payload.event_id ? { ...event, likes: payload.likes } : event
    //     ),
    // loading: false,
    //   };

    default:
      return state;
  }
}
