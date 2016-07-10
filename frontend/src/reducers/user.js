import { createReducer } from 'redux-act'

import {
  requestUserRegister,
  receiveRegisteredUser,
  requestUserLogin,
  userLoggedIn,
  userLogout,
  receivedUserData,
} from 'actions/user'


const initialState = {
  name: null,
  groupId: null,
  registering: false,
  loggingIn: false,
}

export default createReducer({
  [receivedUserData]: (state, payload) => ({
    ...state,
    name: payload.name,
    groupId: payload.group,
  }),

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
