import {createAction} from 'redux-act'

import { backend, defaultFetchParams } from '../config'
import { handleResponse } from '../utils'


export const setGroupPopupStep = createAction('SET GROUP POPUP STEP')

export const requestCreateGroup = createAction('REQUEST CREATE GROUP')
export const receiveCreatedGroup = createAction('RECEIVE CREATED GROUP')
export const createGroup = (name, method) => dispatch => {
  dispatch(requestCreateGroup())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/groups`, {
    ...defaultFetchParams,
    method,
    credentials:'include',
    body: JSON.stringify({ name })
  }).then(handleResponse)
    .then(res => {
      dispatch(receiveCreatedGroup(res))
  }).catch( err => {throw new Error(err)} )
}

export const requestFetchGroup = createAction('REQUEST FETCH GROUP')
export const receiveFetchedGroup = createAction('RECEIVE FETCHED GROUP')
export const fetchGroup = () => dispatch => {
  dispatch(requestFetchGroup())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/groups`, {
    ...defaultFetchParams,
    method: 'GET',
    credentials: 'include',
  }).then(handleResponse)
    .then( res => {
      alert('fu')
      dispatch(receiveFetchedGroup(res[0]))
  })
    .catch( err => {throw new Error(err)} )
}

export const requestSetChosenSubject = createAction('REQUEST SEND CHOSEN SUBJECT')
export const appliedChosenSubject = createAction('APPLIED CHOSEN SUBJECT')
export const sendChosenSubject = (subject, method) => dispatch => {
  dispatch(requestSetChosenSubject())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/subjects`, {
    ...defaultFetchParams,
    method,
    credentials: 'include',
    body: JSON.stringify({ ...subject })
  }).then( handleResponse )
    .then( res => {
      dispatch(appliedChosenSubject(res))
    })
}

export const requestSubjectsList = createAction('REQUEST SUBJECTS LIST')
export const receiveSubjectsList = createAction('RECEIVE SUBJECTS LIST')
export const fetchSubjectsList = (parentResolve, parentReject) => dispatch => {
  dispatch(requestSubjectsList())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/subjects`, {
    ...defaultFetchParams,
    method: 'GET',
    credentials: 'include',
  }).then(handleResponse)
    .then( res => {
      parentResolve && parentResolve()
      dispatch(receiveSubjectsList(res))
  }).catch( err => {
      parentReject && parentReject()
      throw new Error(err)
  })
}

export const requestStudentsList = createAction('REQUEST STUDENTS LIST')
export const receiveStudentsList = createAction('RECEIVE STUDENTS LIST')
export const fetchStudentsList = (parentResolve, parentReject) => dispatch => {
  dispatch(requestStudentsList())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/students2courses?embed=student&embed=course`, {
    ...defaultFetchParams,
    method: 'GET',
    credentials: 'include',
  }).then( handleResponse )
    .then(res => {
      parentResolve && parentResolve()
      dispatch(receiveStudentsList(res))
  }).catch(err => {
      parentReject && parentReject()
      throw new Error(err)
  })
}

export const requestScoresList = createAction('REQUEST SCORES LIST')
export const receiveScoresList = createAction('RECEIVE SCORES LIST')
export const fetchScoresList = (parentResolve, parentReject) => dispatch => {
  dispatch(requestScoresList())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/scores?embed=student&embed=course`, {
    ...defaultFetchParams,
    method: 'GET',
    credentials: 'include',
  }).then( handleResponse )
    .then(res => {
      parentResolve && parentResolve()
      dispatch(receiveScoresList(res))
  }).catch(err => {
      parentReject && parentReject()
      throw new Error(err)
    })
}

export const applyNewScore = (student, course, scoreValue) => dispatch => {
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/scores`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ student, course, scoreValue })
  }).then(res => {
    console.log('A new score has been successfully applied!')
  }).catch(err => {
    throw new Error(err)
  })
}
