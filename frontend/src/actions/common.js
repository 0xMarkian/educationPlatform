import {createAction} from 'redux-act'

import {setCurrentStep} from './newGroupPopup'

import {backend, defaultHeaders} from '../config'

export const setCuratorId = createAction('SET CURATOR ID')
export const setGroupId = createAction('SET GROUP ID')
export const setCourseId = createAction('SET COURSE ID')

export const requestSubjectsList = createAction('REQUEST SUBJECTS LIST')
export const receivedSubjectsList = createAction('RECEIVED SUBJECTS LIST')
export const fetchSubjects = () =>
  dispatch => {
    dispatch(requestSubjectsList())
    fetch(`${backend.ip}:${backend.port}/subjects`, {
      defaultHeaders,
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
         dispatch(receivedSubjectsList(res))
         dispatch(setChosenSubject(res[0]))
    }).catch(ex => {
         throw Error(ex)
    })
  }

// TODO: REWRITE
export const setChosenSubject = createAction('SET CHOSEN SUBJECT')
export const applyChosenSubject = createAction('APPLY CHOSEN SUBJECT')
export const stopFetchingSubjects = createAction('STOP FETCHING SUBJECTS')
export const fetchChosenSubject = (method, subject, group) =>
  dispatch => {
    fetch('http://localhost:8080/courses', {
      mode: 'cors',
      method,
      body: JSON.stringify({ subject, group })
    }).then(response => {
         dispatch(applyChosenSubject())
         dispatch(stopFetchingSubjects())
         dispatch(setCurrentStep(2))
    }).catch(exception => {
         throw Error(exception)
    })
  }

export const requestStudents = createAction('REQUEST STUDENTS')
export const receivedStudents = createAction('RECEIVE STUDENTS')
export const fetchStudents = (parentResolver) =>
  dispatch => {
    dispatch(requestStudents())
    fetch('http://localhost:8080/students', {
      mode: 'cors',
      method: 'GET'
    }).then(response => response.json())
      .then(response => {
        dispatch(receivedStudents(response))
    }).then(() => {
        parentResolver ? parentResolver() : null
    }).catch(exception => {
      throw Error(exception)
    })
  }

export const requestScores = createAction('REQUEST SCORES')
export const receivedScores = createAction('RECEIVE SCORES')
export const fetchScores = (parentResolver) =>
  dispatch => {
    dispatch(requestScores())
    fetch('http://localhost:8080/scores?embed=student&embed=course', {
      mode: 'cors',
      method: 'GET'
    }).then(response => response.json())
      .then(response => {
        dispatch(receivedScores(response))
    }).then(() => {
        parentResolver ? parentResolver() : null
    }).catch(exception => {
      throw Error(exception)
    })
  }
