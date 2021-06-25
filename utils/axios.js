import axios from 'axios'

export default axios.create({
  baseURL: 'https://urlshortener.shnm.ml/',
  withCredentials: true,
  credentials: 'include',
})
