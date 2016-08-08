import { createAction } from 'redux-act'

import { backendAdress, defaultFetchParams } from '../config'
import { parseJSON, handleResponseAndDisplayMessage } from '../utils'



export const setGroupPopupStep = createAction('SET GROUP POPUP STEP')
export const receiveGroupData = createAction('RECEIVE CREATED GROUP')
export const iteractWithServerAboutGroup = createAction('iteractWithServerAboutGroup')


export const createGroup = groupData => dispatch => {
  console.log(groupData)
  dispatch(iteractWithServerAboutGroup())
  return fetch(`${backendAdress}/groups`, {
    ...defaultFetchParams,
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify( groupData ),
  })
  .then(handleResponseAndDisplayMessage(dispatch))
  .then(res => { dispatch(setGroupPopupStep(1)); return dispatch(receiveGroupData(res)) } )

}

export const updateGroup = (groupId, newGroupData) => dispatch => {
  dispatch( iteractWithServerAboutGroup() )

  return fetch(`${backendAdress}/groups/${groupId}`, {
    ...defaultFetchParams,
    method: 'PATCH',
    credentials: 'include',
    body: JSON.stringify(newGroupData),
  })
  .then( () => {  dispatch(setGroupPopupStep(1)); return dispatch(receiveGroupData(newGroupData)) })
}

export const fetchUserGroups = () => dispatch => {
  dispatch(iteractWithServerAboutGroup())
  return fetch(`${backendAdress}/groups`, {
    ...defaultFetchParams,
    method: 'GET',
    credentials: 'include',
  })
  .then(handleResponseAndDisplayMessage(dispatch))
  .then(res => dispatch(receiveGroupData(res[0])) )
}
