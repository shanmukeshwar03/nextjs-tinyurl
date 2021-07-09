import axios from 'axios'
export const BASE = 'https://shnm.cf/'

export const setUrl = async (payload, token) => {
  try {
    const response = await axios.post(BASE + 'url', payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response
  } catch (err) {
    return err.response.data
  }
}

export const getUrl = async (token) => {
  try {
    const response = await axios.get(BASE + 'url', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response
  } catch (err) {
    return err.response.data
  }
}

export const delUrl = async (_id, token) => {
  try {
    const response = await axios.delete(BASE + `url/${_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response
  } catch (err) {
    return err.response.data
  }
}
