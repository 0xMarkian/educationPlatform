import { createReducer } from 'redux-act'

import {
  requestSubjects,
  receiveSubjects,
} from 'actions/subjects'


const initialState = {
  data: null,
  isLoading: false,
}

export default createReducer({
  [requestSubjects]: state => ({
    ...state,
    isLoading: true,
  }),
  [receiveSubjects]: (state, payload) => ({
    ...state,
    data: payload,
    isLoading: false,
  }),
}, initialState)
