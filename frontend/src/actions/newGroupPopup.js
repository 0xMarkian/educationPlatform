import {createAction} from 'redux-act'

import {setGroupId, setCourseId} from './common'


export const showNewGroupPopup = createAction('SHOW NEW GROUP POPUP')
export const hideNewGroupPopup = createAction('HIDE NEW GROUP POPUP')
export const groupNameInput = createAction('GROUP NAME INPUT')
export const setGroupNameError = createAction('SET GROUP NAME ERROR')
export const removeGroupNameError = createAction('REMOVE GROUP NAME ERROR')

export const sendGroupName = createAction('APPLY GROUP NAME')
export const stopFetchingGroupName = createAction('STOP FETCHING GROUP NAME')
export const setCurrentStep = createAction('SET CURRENT STEP')


export const fetchGroupName = (method, curator, name) =>
  dispatch => {
    dispatch(sendGroupName())
    // console.log('Fetching: ', { method, curator, name })
    fetch('http://localhost:8080/groups', {
      method,
      mode: 'cors',
      body: JSON.stringify({ curator, name })
    })//.then(response => {response.json()})
      .then(response => {
        setTimeout(() => {
          dispatch(setGroupId('576ea30282d3a8b863e5dc12'))
          dispatch(stopFetchingGroupName())
          dispatch(setCurrentStep(1))
        }, 1000)
      })
  }
