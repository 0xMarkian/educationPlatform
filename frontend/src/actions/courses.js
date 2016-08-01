import { createAction } from 'redux-act'

import { backendAdress, defaultFetchParams } from '../config'
import { parseJSON, displayMessageAndHandleResponse } from '../utils'


export const requestCourses = createAction('REQUEST COURSES')
export const receiveCourses = createAction('RECEIVE COURSES')
export const fetchCourses = () => dispatch => {
  dispatch(requestCourses())
  fetch(`${backendAdress}/courses`, {
    ...defaultFetchParams,
    method: 'GET',
    credentials: 'include',
  })
  .then(parseJSON)
  .then(displayMessageAndHandleResponse(dispatch))
  .then(res => {
    dispatch(receiveCourses(res))
  })
}

export const requestAddingNewCourse = createAction('REQUEST ADDING NEW COURSE')
export const addedNewCourse = createAction('ADDED NEW COURSE')
export const addCourseToGroup = subject => dispatch => {
  dispatch(requestAddingNewCourse())
  fetch(`${backendAdress}/courses`, {
    ...defaultFetchParams,
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ subject }),
  })
  .then(parseJSON)
  .then(displayMessageAndHandleResponse(dispatch))
  .then((res) => {
    dispatch(addedNewCourse(res))
  })
}

export const removedAddedCourse = createAction('REMOVED ADDED COURSE')
export const removeAddedCourse = (courseId, subjectId) => dispatch => {
  fetch(`${backendAdress}/courses/${courseId}`, {
    ...defaultFetchParams,
    method: 'DELETE',
    credentials: 'include',
  })
  .then(() => {
    dispatch(removedAddedCourse(subjectId))
  })
}
