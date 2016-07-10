import { createAction } from 'redux-act'

import { backend, defaultFetchParams } from '../config'
import { parseResponse } from '../utils'


export const requestAddingNewSubject = createAction('REQUEST ADDING NEW SUBJECT')
export const addedNewSubject = createAction('ADDED NEW SUBJECT')
export const addSubjectToGroup = subject => dispatch => {
  dispatch(requestAddingNewSubject())
  fetch(`${backend}/subject`, {
    ...defaultFetchParams,
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ ...subject }),
  })
  .then(parseResponse)
  .then(() => {
    dispatch(addedNewSubject(subject._id))
  })
}

export const requestSubjects = createAction('REQUEST SUBJECTS')
export const receiveSubjects = createAction('RECEIVE SUBJECTS')
export const fetchSubjects = () => dispatch => {
  dispatch(requestSubjects())
  fetch(`${backend}/subjects`, {
    ...defaultFetchParams,
    method: 'GET',
    credentials: 'include',
  })
  .then(parseResponse)
  .then(res => {
    dispatch(receiveSubjects(res))
  })
}
