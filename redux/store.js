import { configureStore } from '@reduxjs/toolkit';
import auth from 'redux/auth';
import utils from 'redux/utils';
import urls from 'redux/urls';

export default configureStore({
  reducer: { auth, utils, urls },
});
