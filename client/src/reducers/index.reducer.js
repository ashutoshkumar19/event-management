import { combineReducers } from 'redux';
import alert from './alert.reducer';
import auth from './auth.reducer';
import event from './event.reducer';

export default combineReducers({
  alert,
  auth,
  event,
});
