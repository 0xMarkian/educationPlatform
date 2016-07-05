import {createAction} from 'redux-act'

import { backend, defaultHeaders } from '../config'
import { parseJSON } from '../utils'


export const openNewGroupPopup = createAction('SHOW NEW GROUP POPUP')
export const closeNewGroupPopup = createAction('CLOSE NEW GROUP POPUP')
export const setGroupPopupStep = createAction('SET GROUP POPUP STEP')

export const requestCreateGroup = createAction('REQUEST CREATE GROUP')
export const receiveCreatedGroup = createAction('RECEIVE CREATED GROUP')
export const createGroup = (name, method) => dispatch => {
  dispatch(requestCreateGroup())
  fetch(`${backend.protocol}://${backend.ip}:${backend.port}/groups`, {
    ...defaultHeaders,
    method,
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
export const sendChosenSubject = (subject, method) => dispatch => {
  dispatch(requestSetChosenSubject())
  fetch(`${backend.protocol}://${backend.ip}:${backend.port}/subjects`, {
    ...defaultHeaders,
    method,
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ ...subject })
  }).then( parseJSON )
    .then( res => {
      dispatch(appliedChosenSubject(res))
    })
}

export const requestStudentsList = createAction('REQUEST STUDENTS LIST')
export const receiveStudentsList = createAction('RECEIVE STUDENTS LIST')
export const fetchStudentsList = () => dispatch => {
  dispatch(requestStudentsList())
  fetch(`${backend.protocol}://${backend.ip}:${backend.port}/students2courses?embed=student&embed=course`, {
    ...defaultHeaders,
    method: 'GET',
    credentials: 'include',
  }).then( parseJSON )
    .then(res => {
      dispatch(receiveStudentsList(res))
  }).catch( err => { throw new Error(err)} )
}

export const requestScoresList = createAction('REQUEST SCORES LIST')
export const receiveScoresList = createAction('RECEIVE SCORES LIST')
export const fetchScoresList = () => dispatch => {
  dispatch(requestScoresList())
  fetch(`${backend.protocol}://${backend.ip}:${backend.port}/scores?embed=student&embed=course`, {
    ...defaultHeaders,
    method: 'GET',
    credentials: 'include',
  }).then( parseJSON )
    .then(res => {
      dispatch(receiveScoresList(res))
  }).catch( err => { throw new Error(err)} )
}