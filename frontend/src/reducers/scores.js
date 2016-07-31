import { createReducer } from 'redux-act'

import {
  requestScores,
  receiveScores,
  appliedNewScore,
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
    ...state,
    data: payload,
    isFetching: false,
  }),
  [appliedNewScore]: (state, payload) => ({
    ...state,
    test: payload,
  }),
}, initialState)
