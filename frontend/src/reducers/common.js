import {createReducer} from 'redux-act'


import {
  setCuratorId,
  setGroupId,
  setCourseId,
  requestSubjectsList,
  receiveSubjectsList,
  setChosenSubject,
  applyChosenSubject,
  stopFetchingSubjects,
  requestScores,
  receiveScores,
  requestStudents,
  receiveStudents
} from 'actions/common'

const initialState = {
  curatorId: null,
  groupId: null,
  courseId: null,
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
  [receiveStudents]: (state, payload) => ({
    ...state,
    students: {
      ...state.students,
      isFetching: false,
      list: payload
    }
  }),

  [requestScores]: state => ({
    ...state,
    scores: {
      ...state.scores,
      isFetching: true
    }
  }),
  [receiveScores]: (state, payload) => ({
    ...state,
    scores: {
      ...state.scores,
      isFetching: false,
      list: payload
    }
  })
}, initialState)
