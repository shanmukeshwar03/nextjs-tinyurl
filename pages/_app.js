import Notification from 'components/Notification';
import React from 'react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import 'styles/globals.css';
import 'styles/notification.css';
import 'styles/toast.css';
import 'styles/signup.css';
import 'styles/signin.css';
import 'styles/loading.css';
import 'styles/header.css';
import 'styles/dashboard.css';
import 'styles/form.css';
import 'styles/body.css';
import 'styles/center.css';

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Notification />
    </Provider>
  );
};

export default App;
