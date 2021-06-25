import React from 'react';
import axios from 'utils/axios';
import router from 'next/router';
import { useDispatch } from 'react-redux';
import { pushError } from 'redux/utils';

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      axios.get('auth/logout');
      router.replace('/auth/signin');
    } catch (error) {
      dispatch(pushError(error.response.data));
    }
  };

  return (
    <div className="header__container">
      <span>Url Shortener</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
