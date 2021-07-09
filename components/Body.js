import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BASE, delUrl } from 'utils/axiosUrl'
import { popUrl } from 'redux/urls'
import { pushError } from 'redux/utils'

const Body = () => {
  const urls = useSelector((state) => state.urls.urls)
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleDelete = async (_id) => {
    const resp = await delUrl(_id, auth.token)
    if (resp.data) dispatch(popUrl(_id))
    else dispatch(pushError(resp))
  }

  if (!urls.length) {
    return <span className="body__default">No URL's Found</span>
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
          <a href={BASE + url.shr} target="_blank">
            {BASE + url.shr}
          </a>
          <span>{url.clicks}</span>
          <span onClick={() => handleDelete(url._id)}>&#10060;</span>
        </div>
      ))}
    </div>
  )
}

export default Body
