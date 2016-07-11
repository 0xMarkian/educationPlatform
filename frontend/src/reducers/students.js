import { createReducer } from 'redux-act'

import {
  requestStudents,
  receiveStudents,
} from 'actions/students'


const initialState = {
  data: null,
  isFetching: false,
}

export default createReducer({
  [requestStudents]: state => ({
    ...state,
    isFetching: true,
  }),
  [receiveStudents]: (state, payload) => ({
    ...state,
    data: payload,
    isFetching: false,
  }),
}, initialState)
