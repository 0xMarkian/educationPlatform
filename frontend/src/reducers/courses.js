import { createReducer } from 'redux-act'

import {
  requestCourses,
  receiveCourses,

  requestAddingNewCourse,
  addedNewCourse,
  removedAddedCourse,
} from 'actions/courses'


const initialState = {
  data: null,
  isFetching: false,

  addingNewCourse: false,
  initiallyCreatedCourses: {},
}

export default createReducer({
  [requestCourses]: state => ({
    ...state,
    isFetching: true,
  }),
  [receiveCourses]: (state, payload) => ({
    ...state,
    data: payload,
    isFetching: false,
  }),
  [requestAddingNewCourse]: state => ({
    ...state,
    addingNewCourse: true,
  }),
  [addedNewCourse]: (state, payload) => ({
    ...state,
    addingNewCourse: false,
    initiallyCreatedCourses: {
      ...state.initiallyCreatedCourses,
      [payload.subject]: payload._id
    },
  }),
  [removedAddedCourse]: (state, payload) => {
    const initiallyCreatedCourses = { ...state.initiallyCreatedCourses }

    delete initiallyCreatedCourses[payload]
    return {
      ...state,
      initiallyCreatedCourses,
    }
  },
}, initialState)
