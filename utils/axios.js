import axios from 'axios'

export default axios.create({
  baseURL: 'https://854f0bb2fcbe.ngrok.io/',
  withCredentials: true,
  credentials: 'include',
})
