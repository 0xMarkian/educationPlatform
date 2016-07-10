import { createReducer } from 'redux-act'

import {
  requestSubjects,
  receiveSubjects,
} from 'actions/subjects'


const initialState = {
  data: null,
  isFetching: false,
}

export default createReducer({
  [requestSubjects]: state => ({
    ...state,
    isFetching: true,
  }),
  [receiveSubjects]: (state, payload) => ({
    ...state,
    data: payload,
    isFetching: false,
  }),
}, initialState)
