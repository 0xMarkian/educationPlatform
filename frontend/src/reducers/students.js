import { createReducer } from 'redux-act'

import {
  requestStudents,
  receiveStudents,
} from 'actions/students'


const initialState = {
  data: null,
  isLoading: false,
}

export default createReducer({
  [requestStudents]: state => ({
    ...state,
    isLoading: true,
  }),
  [receiveStudents]: (state, payload) => ({
    ...state,
    data: payload,
    isLoading: false,
  }),
}, initialState)
