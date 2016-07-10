import { createReducer } from 'redux-act'

import {
  requestCourses,
  receiveCourses,

  requestAddingNewCourse,
  addedNewCourse,
  removeAddedCourse,
} from 'actions/courses'


const initialState = {
  data: null,
  isFetching: false,

  addingNewCourse: false,
  initiallyCreatedCourses: [],
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
    initiallyCreatedCourses: [...state.initiallyCreatedCourses, payload],
  }),
  [removeAddedCourse]: (state, payload) => ({
    ...state,
    initiallyCreatedCourses: [
      ...state.initiallyCreatedCourses.slice(0, state.initiallyCreatedCourses.indexOf(payload)),
      ...state.initiallyCreatedCourses.slice(state.initiallyCreatedCourses.indexOf(payload) + 1)
    ]
  }),
}, initialState)
