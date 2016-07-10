import { createReducer } from 'redux-act'

import {
  requestSubjects,
  receiveSubjects,
  requestSetChosenSubject,
  appliedChosenSubject,
} from 'actions/subjects'


const initialState = {
  data: null,
  isFetching: false,
  requestMethod: 'POST',
  settingChosenSubject: false,
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
  [requestSetChosenSubject]: state => ({
    ...state,
    settingChosenSubject: true,
  }),
  [appliedChosenSubject]: state => ({
    ...state,
    settingChosenSubject: false,
    requestMethod: 'PATCH',
  }),
}, initialState)
