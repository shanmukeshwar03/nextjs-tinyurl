import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'urls',
  initialState: {
    urls: [],
  },
  reducers: {
    initUrls: (state, action) => {
      state.urls = []
      action.payload.forEach((element) => {
        state.urls.push(element)
      })
    },
    pushUrl: (state, action) => {
      state.urls.push(action.payload)
    },
    popUrl: (state, action) => {
      state.urls = state.urls.filter((url) => url._id !== action.payload)
    },
  },
})

export const { initUrls, pushUrl, popUrl } = slice.actions
export default slice.reducer
