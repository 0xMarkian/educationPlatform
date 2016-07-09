import { createAction } from 'redux-act'

import { backend, defaultFetchParams } from '../config'
import { parseResponse } from '../utils'
import { setGroupPopupStep } from './group'

export const requestSetChosenSubject = createAction('REQUEST SEND CHOSEN SUBJECT')
export const appliedChosenSubject = createAction('APPLIED CHOSEN SUBJECT')
export const sendChosenSubject = (subject, method) => dispatch => {
  dispatch(requestSetChosenSubject())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/subjects`, {
    ...defaultFetchParams,
    method,
    credentials: 'include',
    body: JSON.stringify({ ...subject }),
  })
  .then(parseResponse)
  .then(res => {
    dispatch(appliedChosenSubject(res))
    dispatch(setGroupPopupStep(2))
  })
}

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
