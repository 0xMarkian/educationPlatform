import {createReducer} from 'redux-act'


import {
  setCuratorId,
  setGroupId,
  requestSubjectsList,
  receivedSubjectsList,
  setChosenSubject,
  applyChosenSubject,
  stopFetchingSubjects,
  requestdScores,
  receiveScores,
  requestStudents,
  receivedStudents,
} from 'actions/common'

const initialState = {
  subjects: {
    fetchMethod: 'POST',
    isFetching: false,
    chosen: null,
    list: [{}]
  },
  scores: {
    isFetching: false,
    list: [{}]
  },
  students: {
    isFetching: false,
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

  [requestSubjectsList]: state => ({
    ...state,
    subjects: {
      ...state.subjects,
      isFetching: true
    }
  }),
  [receivedSubjectsList]: (state, payload) => ({
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
      isFetching: false,
      fetchMethod: 'PATCH'
    }
  }),

  [requestStudents]: state => ({
    ...state,
    students: {
      ...state.students,
      isFetching: true
    }
  }),
  [receivedStudents]: (state, payload) => ({
    ...state,
    students: {
      ...state.students,
      isFetching: false,
      list: payload
    }
  })
}, initialState)
