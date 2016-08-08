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

export const requestAddingNewStudent = createAction('REQUEST ADDING NEW STUDENT')
export const addedNewStudent = createAction('ADDED NEW STUDENT')
export const addNewStudent = name => dispatch => {
  dispatch(requestAddingNewStudent())
  fetch(`${backendAdress}/students`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({name}),
  })
  .then(handleResponseAndDisplayMessage(dispatch))
  .then(res => dispatch(addedNewStudent(res)))
}

export const removedAddedStudent = createAction('REMOVED ADDED STUDENT')
export const removeAddedStudent = studentId => dispatch => (
  fetch(`${backendAdress}/students/${studentId}`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'DELETE',
  })
  .then(() => dispatch(removedAddedStudent(studentId)))
)
