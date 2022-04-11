import messaging from '@react-native-firebase/messaging';
import authApi from '../api/authApi';
import { addNotification } from '../actions/actions';
import { store } from './configureStore';
import notifee from '@notifee/react-native';

const messageApp = messaging();

export function initDeviceTokenSync() {
  syncToken();

  return messageApp.onTokenRefresh(newToken => {
    new Promise(resolve => setTimeout(resolve, 500)).then(() => {
      if (store.getState().userInfo.user)
        authApi
          .updateDeviceToken(newToken)
          .then(() => console.log('Device Token Updated By Refresh'))
          .catch(err => console.log(err));
    });
  });
}

export function syncToken() {
  new Promise(resolve => setTimeout(resolve, 500)).then(() => {
    if (store.getState().userInfo.user)
      messageApp.getToken().then(async token => {
        authApi
          .updateDeviceToken(token)
          .then(() => console.log('Device Token Updated By getToken'))
          .catch(err => console.log(err));
      });
  });
}

export function removeToken() {
  messageApp
    .deleteToken()
    .then(() => console.log('Device Token deleted'))
    .catch(err => console.log(err));
}

export function initForegroundMessage() {
  return messageApp.onMessage(async remoteMessage => {
    const { room, type, ...data } = remoteMessage.data;
    const { messageId: id, sentTime } = remoteMessage;
    switch (type) {
      default:
        store.dispatch(addNotification({ id, sentTime, ...data }));
        break;
    }
  });
}

export async function initBackgroudMessage() {
  return messageApp.setBackgroundMessageHandler(async remoteMessage => {
    const { room, type, ...data } = remoteMessage.data;
    const { messageId: id, sentTime } = remoteMessage;
    switch (type) {
      default:
        store.dispatch(addNotification({ id, sentTime, ...data }));
        break;
    }
  });
}

export default messageApp;
