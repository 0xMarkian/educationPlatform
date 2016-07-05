import {createReducer} from 'redux-act'

import {
  requestUserRegister,
  receiveRegisteredUser,

  requestUserLogin,
  userLoggedIn
} from 'actions/user'


const initialState = {
  name: null,
  registering: false,
  loggingIn: true
}

export default createReducer({
  [requestUserRegister]: state => ({
    ...state,
    registering: true
  }),
  [receiveRegisteredUser]: state => ({
    ...state,
    registering: false
  }),

  [requestUserLogin]: (state, payload) => ({
    ...state,
    name: payload,
    loggingIn: true,
  }),

  [userLoggedIn]: state => ({
    ...state,
    loggingIn: false
  })
}, initialState)
