import { createAction } from 'redux-act'

import { backendAdress, defaultFetchParams } from '../config'
import { parseJSON, handleResponseAndDisplayMessage } from '../utils'


export const requestStudents = createAction('REQUEST STUDENTS')
export const receiveStudents = createAction('RECEIVE STUDENTS')
export const fetchStudents = () => dispatch => {
  dispatch(requestStudents())
  fetch(`${backendAdress}/students`,
    {
      ...defaultFetchParams,
      method: 'GET',
      credentials: 'include',
    })
  .then(handleResponseAndDisplayMessage(dispatch))
  .then(data => dispatch(receiveStudents(data)))
}

export const addedNewStudent = createAction('ADDED NEW STUDENT')
export const addNewStudent = name => dispatch => (
  fetch(`${backendAdress}/students`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ name }),
  })
  .then(handleResponseAndDisplayMessage(dispatch))
  .then(data => Promise.resolve(data))
  // .catch(err => {throw new Error(err)})
)

// export const removedStudent = createAction('REMOVED STUDENT')
export const removeStudent = studentId => () => (
  fetch(`${backendAdress}/students/${studentId}`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'DELETE',
  })
  .then(() => Promise.resolve())
)
