import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'utils',
  initialState: {
    errors: [],
    loading: true,
  },
  reducers: {
    pushError: (state, action) => {
      state.errors.push(action.payload)
    },
    popError: (state, action) => {
      state.errors.pop()
    },
    setLoading: (state, action) => {
      state.loading = true
    },
    delLoading: (state, action) => {
      state.loading = false
    },
  },
})

export const { pushError, popError, setLoading, delLoading } = slice.actions
export default slice.reducer
