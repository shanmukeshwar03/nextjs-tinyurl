import { configureStore } from '@reduxjs/toolkit'
import auth from 'redux/auth'
import utils from 'redux/utils'
import urls from 'redux/urls'

const store = configureStore({
  reducer: { auth, utils, urls },
})

store.subscribe(() => {
  localStorage.setItem('auth', JSON.stringify(store.getState().auth))
})

export default store
