import { createReducer } from 'redux-act'

import {
  requestScores,
  receiveScores,
  appliedNewScore,
} from 'actions/scores'


const initialState = {
  data: null,
  isLoading: false,
}

export default createReducer({
  [requestScores]: state => ({
    ...state,
    isLoading: true,
  }),
  [receiveScores]: (state, payload) => ({
    ...state,
    data: payload,
    isLoading: false,
  }),
  [appliedNewScore]: (state, payload) => ({
    ...state,
    test: payload,
  }),
}, initialState)
