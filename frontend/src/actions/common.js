import {createAction} from 'redux-act'

import {setCurrentStep} from './newGroupPopup'


export const setCuratorId = createAction('SET CURATOR ID')
export const setGroupId = createAction('SET GROUP ID')
export const setCourseId = createAction('SET COURSE ID')

export const requestSubjectsList = createAction('REQUEST SUBJECTS LIST')
export const receiveSubjectsList = createAction('RECEIVE SUBJECTS LIST')
export const fetchSubjectsList = () =>
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
export const fetchChosenSubject = (subject, group) =>
  dispatch => {
    console.log(JSON.stringify({ subject, group }))
    dispatch(applyChosenSubject())
    setTimeout(() => {
      dispatch(setCourseId('576e93ddc1bc001b1c4ecb8d'))
      dispatch(stopFetchingSubjects())
      dispatch(setCurrentStep(2))
    }, 1000)
    //fetch('http://localhost:8080/courses', {
    //  mode: 'cors',
    //  method: 'post',
    //  body: JSON.stringify({ subject, group })
    //}).then(() => {
    //     dispatch(stopFetchingSubjects())
    //}).catch(exception => {
    //     throw Error(exception)
    //})
  }
