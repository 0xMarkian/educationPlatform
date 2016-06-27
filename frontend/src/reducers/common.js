import {createReducer} from 'redux-act'


import {
  setCuratorId,
  setGroupId,
  setCourseId,
  requestSubjectsList,
  receiveSubjectsList,
  setChosenSubject,
  applyChosenSubject,
  stopFetchingSubjects
} from 'actions/common'

const initialState = {
  curatorId: null,
  groupId: null,
  courseId: null,
  subjects: {
    isFetching: false,
    chosen: null,
    list: [{}]
  }
}

export default createReducer({
  [setCuratorId]: (state, payload) => ({
    ...state,
    curatorId: payload
  }),
  [setGroupId]: (state, payload) => ({
    ...state,
    groupId: payload
  }),
  [setCourseId]: (state, payload) => ({
    ...state,
    courseId: payload
  }),
  [requestSubjectsList]: state => ({
    ...state,
    subjects: {
      ...state.subjects,
      isFetching: true
    }
  }),
  [receiveSubjectsList]: (state, payload) => ({
    ...state,
    subjects: {
      ...state.subjects,
      isFetching: false,
      list: payload
    }
  }),
  [setChosenSubject]: (state, payload) => ({
    ...state,
    subjects: {
      ...state.subjects,
      chosen: payload
    }
  }),
  [applyChosenSubject]: state => ({
    ...state,
    subjects: {
      ...state.subjects,
      isFetching: true
    }
  }),
  [stopFetchingSubjects]: state => ({
    ...state,
    subjects: {
      ...state.subjects,
      isFetching: false
    }
  })
}, initialState)
