import { createSlice } from '@reduxjs/toolkit'

let initialState = { user: undefined, token: undefined }

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
    delUser: (state) => {
      state.user = undefined
      state.token = undefined
    }
  }
})

export const { setUser, delUser } = slice.actions
export default slice.reducer
