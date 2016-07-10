import { createAction } from 'redux-act'

import { backend, defaultFetchParams } from '../config'
import { parseResponse } from '../utils'


export const requestCourses = createAction('REQUEST COURSES')
export const receiveCourses = createAction('RECEIVE COURSES')
export const fetchCourses = () => dispatch => {
  dispatch(requestCourses())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/courses`, {
    ...defaultFetchParams,
    method: 'GET',
    credentials: 'include',
  })
  .then(parseResponse)
  .then(res => {
    dispatch(receiveCourses(res))
  })
}

export const requestAddingNewCourse = createAction('REQUEST ADDING NEW COURSE')
export const addedNewCourse = createAction('ADDED NEW COURSE')
export const addCourseToGroup = subject => dispatch => {
  dispatch(requestAddingNewCourse())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/courses`, {
    ...defaultFetchParams,
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ subject }),
  })
  .then(parseResponse)
  .then((res) => {
    console.log(res)
    //dispatch(addedNewCourse(subject._id))
  })
}

export const removeAddedSubject = createAction('null')
