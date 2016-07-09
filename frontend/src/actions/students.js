import { createAction } from 'redux-act'

import { backend, defaultFetchParams } from '../config'
import { handleResponse } from '../utils'


export const requestStudents = createAction('REQUEST STUDENTS')
export const receiveStudents = createAction('RECEIVE STUDENTS')
export const fetchStudents = () => dispatch => {
  dispatch(requestStudents())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/students2courses?embed=student&embed=course`,
    {
      ...defaultFetchParams,
      method: 'GET',
      credentials: 'include',
    })
  .then(handleResponse)
  .then(res => {
    const students = {}
    res.forEach(studentObj => {
      students[studentObj.student._id] = studentObj.student.name
    })
    console.log(students)
    dispatch(receiveStudents(students))
  })
}

export const addNewStudent = name => () => {
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/students`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ name }),
  })
  .then(handleResponse)
  .then(() => {
    // console.log(res)
  })
  .catch(err => {
    throw new Error(err)
  })
}
