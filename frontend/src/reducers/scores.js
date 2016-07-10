import { createReducer } from 'redux-act'

import {
  requestScores,
  receiveScores,
  openScoreAppliedMsg,
  closeScoreAppliedMsg,
} from 'actions/scores'


const initialState = {
  data: null,
  isFetching: false,
  IsShownScoreAppliedMsg: false,
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
  [openScoreAppliedMsg]: state => ({
    ...state,
    IsShownScoreAppliedMsg: true,
  }),
  [closeScoreAppliedMsg]: state => ({
    ...state,
    IsShownScoreAppliedMsg: false
  }),
}, initialState)
