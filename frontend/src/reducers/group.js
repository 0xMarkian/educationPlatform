import { createReducer } from 'redux-act'

import {
  requestCreateGroup,
  receiveCreatedGroup,
  requestFetchGroup,
  receiveFetchedGroup,
  requestSubjectsList,
  receiveSubjectsList,
  requestSetChosenSubject,
  appliedChosenSubject,
  setGroupPopupStep,
  requestStudentsList,
  receiveStudentsList,
  requestScoresList,
  receiveScoresList,
} from 'actions/group'


const initialState = {
  groupData: {},
  newGroupPopup: {
    step: 0,
  },
  requestMethod: 'POST',
  isCreating: false,
  isFetching: false,
  subjects: {
    list: null,
    isFetching: false,
    requestMethod: 'POST',
    settingChosenSubject: false,
  },
  students: {
    list: null,
    isFetching: false,
  },
  scores: {
    list: null,
    isFetching: false,
  },
}

export default createReducer({
  [setGroupPopupStep]: (state, payload) => ({
    ...state,
    newGroupPopup: {
      ...state.newGroupPopup,
      step: payload,
    },
  }),
  [requestCreateGroup]: state => ({
    ...state,
    isCreating: true,
  }),
  [receiveCreatedGroup]: (state, payload) => ({
    ...state,
    isCreating: false,
    groupData: payload,
    requestMethod: 'PATCH',
    newGroupPopup: {
      ...state.newGroupPopup,
      step: 1,
    },
  }),
  [requestFetchGroup]: state => ({
    ...state,
    isFetching: true,
  }),
  [receiveFetchedGroup]: (state, payload) => ({
    ...state,
    isFetching: false,
    groupData: payload,
  }),
  [requestSubjectsList]: state => ({
    ...state,
    subjects: {
      ...state.subjects,
      isFetching: true,
    },
  }),
  [receiveSubjectsList]: (state, payload) => ({
    ...state,
    subjects: {
      ...state.subjects,
      list: payload,
      isFetching: false,
    },
  }),
  [requestSetChosenSubject]: state => ({
    ...state,
    subjects: {
      ...state.subjects,
      settingChosenSubject: true,
    },
  }),
  [appliedChosenSubject]: state => ({
    ...state,
    newGroupPopup: {
      ...state.newGroupPopup,
      step: 2,
    },
    subjects: {
      ...state.subjects,
      settingChosenSubject: false,
      requestMethod: 'PATCH',
    },
  }),
  [requestStudentsList]: state => ({
    ...state,
    students: {
      ...state.students,
      isFetching: true,
    },
  }),
  [receiveStudentsList]: (state, payload) => ({
    ...state,
    students: {
      list: payload,
      isFetching: false,
    },
  }),
  [requestScoresList]: state => ({
    ...state,
    scores: {
      ...state.scores,
      isFetching: true,
    },
  }),
  [receiveScoresList]: (state, payload) => ({
    ...state,
    scores: {
      list: payload,
      isFetching: false,
    },
  }),
}, initialState)
