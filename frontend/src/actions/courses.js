import { createAction } from 'redux-act'

import { backend, defaultFetchParams } from '../config'
import { handleResponse } from '../utils'


export const requestCourses = createAction('REQUEST COURSES')
export const receiveCourses = createAction('RECEIVE COURSES')
export const fetchCourses = () => dispatch => {
  dispatch(requestCourses())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/courses`,
    {
      ...defaultFetchParams,
      method: 'GET',
      credentials: 'include',
    })
  .then(handleResponse)
  .then(res => {
    dispatch(receiveCourses(res))
  })
}
