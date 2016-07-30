import { createReducer } from 'redux-act'

import {
  iteractWithServerAboutUser,
  receivedUserData,

  rejectLogin,
  removeLoginError,
} from 'actions/user'


const initialState = {
  data: null,
  loading: false,
  validatingErrors: {},
}

export default createReducer({
  [receivedUserData]: (state, payload) => ({
    ...state,
    loading: false,
    data: payload,
  }),

  [iteractWithServerAboutUser]: state => ({
    ...state,
    loading: true,
  }),


  [rejectLogin]: (state, payload) => ({
    ...state,
    loginError: payload,
  }),

  [removeLoginError]: (state, payload) => ({
    ...state,
    loginError: null,
  }),
}, initialState)
