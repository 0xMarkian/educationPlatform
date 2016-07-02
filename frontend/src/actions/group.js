import {createAction} from 'redux-act'

import { backend, defaultHeaders } from '../config'
import { parseJSON } from '../utils'


export const openNewGroupPopup = createAction('SHOW NEW GROUP POPUP')
export const closeNewGroupPopup = createAction('HIDE NEW GROUP POPUP')

export const requestCreateGroup = createAction('REQUEST CREATE GROUP')
export const receiveCreatedGroup = createAction('RECEIVE CREATED GROUP')
export const createGroup = name => dispatch => {
  dispatch(requestCreateGroup())
  fetch(`${backend.protocol}://${backend.ip}:${backend.port}/groups`, {
    ...defaultHeaders,
    method: 'POST',
    mode: 'cors',
    credentials:'include',
    body: JSON.stringify({ name })
  }).then(parseJSON)
    .then(res => {
      console.log('New-created group data: ', res)
      dispatch(receiveCreatedGroup(res))
  }).catch( err => {throw new Error(err)} )
}

export const requestFetchGroup = createAction('REQUEST FETCH GROUP')
export const receiveFetchedGroup = createAction('RECEIVE FETCHED GROUP')
export const fetchGroup = name => dispatch => {
  dispatch(requestFetchGroup())
  fetch(`${backend.protocol}://${backend.ip}:${backend.port}/groups`, {
    ...defaultHeaders,
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  }).then(parseJSON)
    .then( res => {
      dispatch(receiveFetchedGroup(res[0]))
  })
    .catch( err => {throw new Error(err)} )
}

export const requestSubjectsList = createAction('REQUEST SUBJECTS LIST')
export const receiveSubjectsList = createAction('RECEIVE SUBJECTS LIST')
export const fetchSubjectsList = () => dispatch => {
  dispatch(requestSubjectsList())
  fetch(`${backend.protocol}://${backend.ip}:${backend.port}/subjects`, {
    ...defaultHeaders,
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  }).then(parseJSON)
    .then( res => {
      dispatch(receiveSubjectsList(res))
  }).catch( err => {throw new Error(err)} )
}

export const requestSetChosenSubject = createAction('REQUEST SEND CHOSEN SUBJECT')
export const appliedChosenSubject = createAction('APPLIED CHOSEN SUBJECT')
export const sendChosenSubject = subject => dispatch => {
  dispatch(requestSetChosenSubject())
  fetch(`${backend.protocol}://${backend.ip}:${backend.port}/subjects`, {
    ...defaultHeaders,
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ ...subject })
  }).then( parseJSON )
    .then( res => {
      console.log(res)
      dispatch(appliedChosenSubject(res))
    })
}
