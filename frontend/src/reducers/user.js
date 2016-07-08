import { createReducer } from 'redux-act'

import {
  requestUserRegister,
  receiveRegisteredUser,
  requestUserLogin,
  userLoggedIn,
  userLogout,
} from 'actions/user'


const initialState = {
  name: null,
  registering: false,
  loggingIn: false,
  loggedIn: false,
}

export default createReducer({
  [requestUserRegister]: state => ({
    ...state,
    registering: true,
  }),
  [receiveRegisteredUser]: state => ({
    ...state,
    registering: false,
  }),

  [requestUserLogin]: state => ({
    ...state,
    loggedIn: false,
    loggingIn: true,
  }),

  [userLoggedIn]: (state, payload) => ({
    ...state,
    name: payload,
    loggedIn: true,
    loggingIn: false,
  }),

  [userLogout]: state => ({
    ...state,
    loggedIn: false,
  }),
}, initialState)
