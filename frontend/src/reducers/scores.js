import { createReducer } from 'redux-act'

import {
  requestScores,
  receiveScores,
} from 'actions/scores'


const initialState = {
  data: null,
  isFetching: false,
}

export default createReducer({
  [requestScores]: state => ({
    ...state,
    isFetching: true,
  }),
  [receiveScores]: (state, payload) => ({
    data: payload,
    isFetching: false,
  }),
}, initialState)
