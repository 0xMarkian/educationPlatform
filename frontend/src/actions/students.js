import { createAction } from 'redux-act'

import { backend, defaultFetchParams } from '../config'
import { parseResponse } from '../utils'


export const requestStudents = createAction('REQUEST STUDENTS')
export const receiveStudents = createAction('RECEIVE STUDENTS')
export const fetchStudents = () => dispatch => {
  dispatch(requestStudents())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/students`,
    {
      ...defaultFetchParams,
      method: 'GET',
      credentials: 'include',
    })
  .then(parseResponse)
  .then(res => {
    dispatch(receiveStudents(res))
  })
}

export const addedNewStudent = createAction('ADDED NEW STUDENT')
export const addNewStudent = name => dispatch => {
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/students`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ name }),
  })
  .then(parseResponse)
  .then((res) => {
    dispatch(addedNewStudent(res))
  })
  .catch(err => {
    throw new Error(err)
  })
}

export const removedAddedStudent = createAction('removedAddedStudent')
export const removeAddedStudent = studentId => dispatch => {
  dispatch(removedAddedStudent(studentId))
}