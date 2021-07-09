import { createSlice } from '@reduxjs/toolkit'
import router from 'next/router'

let initialState = {
  user: undefined,
  token: undefined,
}

if (typeof window !== 'undefined') {
  const localAuth = JSON.parse(localStorage.getItem('auth'))
  if (localAuth) initialState = localAuth
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    removeUser: (state, action) => {
      state.user = undefined
      state.token = undefined
    },
  },
})

export const { setUser, removeUser } = slice.actions
export default slice.reducer
