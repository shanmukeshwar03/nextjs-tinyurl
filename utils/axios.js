import axios from 'axios'

export default axios.create({
  baseURL: 'https://shnm.cf/',
  withCredentials: true,
  credentials: 'include',
})
