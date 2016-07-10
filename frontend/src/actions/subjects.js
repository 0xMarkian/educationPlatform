import { createAction } from 'redux-act'

import { backend, defaultFetchParams } from '../config'
import { parseResponse } from '../utils'


export const requestSubjects = createAction('REQUEST SUBJECTS')
export const receiveSubjects = createAction('RECEIVE SUBJECTS')
export const fetchSubjects = () => dispatch => {
  dispatch(requestSubjects())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/subjects`, {
    ...defaultFetchParams,
    method: 'GET',
    credentials: 'include',
  })
  .then(parseResponse)
  .then(res => {
    dispatch(receiveSubjects(res))
  })
}
