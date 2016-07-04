import { createReducer } from 'redux-act'

import {
  openNewGroupPopup,
  closeNewGroupPopup,
  requestCreateGroup,
  receiveCreatedGroup,
  requestFetchGroup,
  receiveFetchedGroup,
  requestSubjectsList,
  receiveSubjectsList,
  requestSetChosenSubject,
  appliedChosenSubject,
  setGroupPopupStep,
} from 'actions/group'


const initialState = {
  groupData: {},
  newGroupPopup: {
    open: true,
    step: 0
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
}

export default createReducer({
  [openNewGroupPopup]: state => ({
    ...state,
    newGroupPopup: {
      open: true,
    },
  }),
  [closeNewGroupPopup]: (state, payload) => ({
    ...state,
    newGroupPopup: {
      open: false,
    },
  }),
  [setGroupPopupStep]: (state, payload) => ({
    ...state,
    newGroupPopup: {
      ...state.newGroupPopup,
      step: payload,
    }
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
  [requestFetchGroup]: (state, payload) => ({
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
      isFetching: true
    },
  }),
  [receiveSubjectsList]: (state, payload) => ({
    ...state,
    subjects: {
      ...state.subjects,
      list: payload,
      isFetching: false,
    }
  }),
  [requestSetChosenSubject]: state => ({
    ...state,
    subjects: {
      ...state.subjects,
      settingChosenSubject: true,
    }
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
      requestMethod: 'PATCH'
    },
  }),
}, initialState)
