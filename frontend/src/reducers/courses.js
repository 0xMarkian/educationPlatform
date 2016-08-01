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
    initiallyCreatedCourses: [
      ...state.initiallyCreatedCourses,
      payload,
    ],
  }),
  [removedAddedCourse]: (state, payload) => {
    let courseToDeleteIndex = null

    state.initiallyCreatedCourses.find((course, i) => {
      if(course._id === payload){
        courseToDeleteIndex = i
        return true
      }
      return false
    })

    return {
      ...state,
      initiallyCreatedCourses: [
        ...state.initiallyCreatedCourses.slice(0, courseToDeleteIndex),
        ...state.initiallyCreatedCourses.slice(courseToDeleteIndex + 1),
      ],
    }
  },
}, initialState)
