import { createReducer } from 'redux-act'

import {
  iteractWithServerAboutUser,
  receivedUserData,

  rejectLogin,
  removeLoginErrors,
} from 'actions/user'


const initialState = {
  data: null,
  loading: false,
  validatingErrors: null,
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
    validatingErrors: payload,
    loading: false,
  }),

  [removeLoginErrors]: state => ({ // TODO: Remove fields partially
    ...state,
    validatingErrors: null,
  }),
}, initialState)
