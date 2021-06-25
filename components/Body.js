import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'utils/axios';
import { popUrl } from 'redux/urls';
import { pushError } from 'redux/utils';

const Body = () => {
  const urls = useSelector((state) => state.urls.urls);
  const dispatch = useDispatch();

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`url/${_id}`);
      dispatch(popUrl(_id));
    } catch (error) {
      dispatch(pushError(error.response.data));
    }
  };

  if (!urls.length) {
    return <span className="body__default">No URL's Found</span>;
  }

  return (
    <div className="body__container">
      <div className="body__header">
        <span>Sno</span>
        <span>Long URL</span>
        <span>Short URL</span>
        <span>Clicks</span>
        <span></span>
      </div>
      {urls.map((url, key) => (
        <div key={key} className="body__content">
          <span>{key + 1}.</span>
          <a href={url.source} target="_blank">
            {url.source}
          </a>
          <a href={axios.defaults.baseURL + url.shr} target="_blank">
            {axios.defaults.baseURL + url.shr}
          </a>
          <span>{url.clicks}</span>
          <span onClick={() => handleDelete(url._id)}>&#10060;</span>
        </div>
      ))}
    </div>
  );
};

export default Body;
