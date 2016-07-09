import { createReducer } from 'redux-act'

import {
  requestCourses,
  receiveCourses,
} from 'actions/courses'


const initialState = {
  data: null,
  isFetching: false,
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
}, initialState)
