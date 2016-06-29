import {createAction} from 'redux-act'

import {setCurrentStep} from './newGroupPopup'


export const setCuratorId = createAction('SET CURATOR ID')
export const setGroupId = createAction('SET GROUP ID')
export const setCourseId = createAction('SET COURSE ID')

export const requestSubjectsList = createAction('REQUEST SUBJECTS LIST')
export const receiveSubjectsList = createAction('RECEIVE SUBJECTS LIST')
export const fetchSubjects = () =>
  dispatch => {
    dispatch(requestSubjectsList())
    fetch('http://localhost:8080/subjects', {
      mode: 'cors',
      method: 'GET'
    }).then(response => response.json())
      .then(response => {
         dispatch(receiveSubjectsList(response))
         dispatch(setChosenSubject(response[0]))
    }).catch(exception => {
         throw Error(exception)
    })
  }


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
        console.log('res', response)
         dispatch(applyChosenSubject())
         dispatch(setCourseId('576e93ddc1bc001b1c4ecb8d'))
         dispatch(stopFetchingSubjects())
         dispatch(setCurrentStep(2))
    }).catch(exception => {
         throw Error(exception)
    })
  }

export const requestStudents = createAction('REQUEST STUDENTS')
export const receiveStudents = createAction('RECEIVE STUDENTS')
export const fetchStudents = () =>
  dispatch => {
    dispatch(requestStudents())
    fetch('http://localhost:8080/students', {
      mode: 'cors',
      method: 'GET'
    }).then(response => response.json())
      .then(response => {
        dispatch(receiveStudents(response))
    }).catch(exception => {
      throw Error(exception)
    })
  }

export const requestScores = createAction('REQUEST SCORES')
export const receiveScores = createAction('RECEIVE SCORES')
export const fetchScores = () =>
  dispatch => {
    dispatch(requestScores())
    fetch('http://localhost:8080/scores?embed=student&embed=course', {
      mode: 'cors',
      method: 'GET'
    }).then(response => response.json())
      .then(response => {
        dispatch(receiveScores(response))
    }).catch(exception => {
      throw Error(exception)
    })
  }
