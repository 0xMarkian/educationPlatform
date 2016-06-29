import {createAction} from 'redux-act'

import {setGroupId, setCourseId} from './common'


export const showNewGroupPopup = createAction('SHOW NEW GROUP POPUP')
export const hideNewGroupPopup = createAction('HIDE NEW GROUP POPUP')
export const groupNameInput = createAction('GROUP NAME INPUT')
export const setGroupNameError = createAction('SET GROUP NAME ERROR')
export const removeGroupNameError = createAction('REMOVE GROUP NAME ERROR')

export const sendGroupName = createAction('SEND GROUP NAME')
export const stopFetchingGroupName = createAction('STOP FETCHING GROUP NAME')
export const setCurrentStep = createAction('SET CURRENT STEP')


export const createGroup = (method, curator, name) =>
  dispatch => {
    dispatch(sendGroupName())
    fetch('http://localhost:8080/groups', {
      method,
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ curator, name })
    }).then(response => response.json())
      .then(response => {
          dispatch(setGroupId(response._id))
          dispatch(stopFetchingGroupName())
          dispatch(setCurrentStep(1))
      }).catch(exception => {throw new Error(exception)})
  }
