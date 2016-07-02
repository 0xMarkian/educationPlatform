import {createReducer} from 'redux-act'

import {
  requestUserSignUp,
  receiveSignedUpUser,

  requestUserSignIn,
  userSignedIn
} from 'actions/user'


const initialState = {
  name: null,
  signingUp: false,
  signingIn: true
}

export default createReducer({
  [requestUserSignUp]: state => ({
    ...state,
    signingUp: true
  }),
  [receiveSignedUpUser]: state => ({
    ...state,
    signingUp: false
  }),

  [requestUserSignIn]: state => ({
    ...state,
    signingIn: true
  }),

  [userSignedIn]: state => ({
    ...state,
    signingIn: false
  })
}, initialState)
