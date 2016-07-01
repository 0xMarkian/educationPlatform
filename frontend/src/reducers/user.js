import {createReducer} from 'redux-act'

import {
  requestUserSignUp,
  receivedSignedUpUser,

  requestUserSignIn,
  userSignedIn
} from 'actions/user'


const initialState = {
  name: null,
  token: null,
  groupId: null,
  signingUp: false,
  signingIn: true
}

export default createReducer({
  [requestUserSignUp]: state => ({
    ...state,
    signingUp: true
  }),
  [receivedSignedUpUser]: state => ({
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
