import { useSelector, useDispatch } from "react-redux";
import { popUrl } from "redux/urls";
import { pushError } from "redux/utils";
import axios from "axios";

const BASE_URL = process.env.BASE_URL;
const SHRINK_URL = process.env.SHRINK_URL;

const Body = () => {
  const urls = useSelector((state) => state.urls.urls);
  const dispatch = useDispatch();

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(BASE_URL + "/url/" + _id);
      if (response.data) dispatch(popUrl(_id));
      else dispatch(pushError(response.data));
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
          <a href={SHRINK_URL + "/" + url.shr} target="_blank">
            {SHRINK_URL + "/" + url.shr}
          </a>
          <span>{url.clicks}</span>
          <div className="button__grid">
            <img
              className="icon"
              src="/icons/copy.svg"
              onClick={() => {
                navigator.clipboard.writeText(SHRINK_URL + "/" + url.shr);
              }}
            />
            <span onClick={() => handleDelete(url._id)}>&#10060;</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Body;
