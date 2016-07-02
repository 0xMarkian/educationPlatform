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
} from 'actions/group'


const initialState = {
  groupData: {},
  newGroupPopup: {
    open: false,
    step: 1
  },
  isCreating: false,
  isFetching: false,
  subjects: {
    list: null,
    isFetching: false,
    settingChosenSubject: false,
  },
}

export default createReducer({
  [openNewGroupPopup]: state => ({
    ...state,
    newGroupPopupOpen: true
  }),
  [closeNewGroupPopup]: state => ({
    ...state,
    newGroupPopupOpen: false
  }),
  [requestCreateGroup]: state => ({
    ...state,
    isCreating: true,
  }),
  [receiveCreatedGroup]: (state, payload) => ({
    ...state,
    isCreating: false,
    groupData: payload,
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
      isFetchingList: true
    },
  }),
  [receiveSubjectsList]: (state, payload) => ({
    ...state,
    subjects: {
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
    },
  }),
}, initialState)
