import { combineReducers } from 'redux';
import userInfo from './userInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CLEAN_STORE } from '../constants/types';
import notification from './notification';

const appReducer = combineReducers({
  userInfo,
  notification,
});

const rootReducer = (state, action) => {
  if (action.type === CLEAN_STORE) {
    state = undefined;
    AsyncStorage.removeItem('persist:root');
  }
  return appReducer(state, action);
};

export default rootReducer;
