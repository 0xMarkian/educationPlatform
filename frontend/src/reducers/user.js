import { createReducer } from 'redux-act'

import {
  applyUserNeedsAccount,


  requestUserRegister,
  receiveRegisteredUser,
  requestUserLogin,
  userLoggedIn,
  rejectLogin,
  userLoggedOut, //TODO Add funtionality to clear all redux store.
  receivedUserData,
  removeLoginError,
} from 'actions/user'


const initialState = {
  userNeedsAccount: false,
  data: null,

  registering: false,
  loggingIn: false,
  loginError: null,
}

export default createReducer({
  [applyUserNeedsAccount]: state => ({
    ...state,
    userNeedsAccount: true,
  }),
  [receivedUserData]: (state, payload) => ({
    ...state,
    data: payload,
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
    loggingIn: true,
  }),

  // [userLoggedIn]: (state, payload) => ({
  //   ...state,
  //   name: payload,
  //   loggingIn: false,
  // }),
  //
  // [userLoggedOut]: state => ({
  //   ...state,
  //   name: null,
  // }),

  [rejectLogin]: (state, payload) => ({
    ...state,
    loginError: payload,
  }),

  [removeLoginError]: (state, payload) => ({
    ...state,
    loginError: null,
  }),
}, initialState)
