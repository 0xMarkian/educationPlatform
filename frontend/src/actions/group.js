import { createAction } from 'redux-act'

import { backendAdress, defaultFetchParams } from '../config'
import { parseJSON, handleResponseAndDisplayMessage } from '../utils'


export const setGroupPopupStep = createAction('SET GROUP POPUP STEP')

export const requestCreateGroup = createAction('REQUEST CREATE GROUP')
export const receiveCreatedGroup = createAction('RECEIVE CREATED GROUP')
export const createGroup = name => dispatch => {
  dispatch(requestCreateGroup())
  fetch(`${backendAdress}/groups`, {
    ...defaultFetchParams,
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ name }),
  })
  .then(handleResponseAndDisplayMessage(dispatch))
  .then(res => {
    dispatch(receiveCreatedGroup(res))
  })
  // .catch(err => { throw new Error(err) })
}

export const requestPatchGroupName = createAction('REQUEST PATCH GROUP NAME')
export const receivePatchedGroupName = createAction('RECEIVE PATCHED GROUP NAME')
export const patchGroupName = (groupId, name) => dispatch => {
  console.log('patching')
  dispatch(requestPatchGroupName())
  fetch(`${backendAdress}/groups/${groupId}`, {
    ...defaultFetchParams,
    method: 'PATCH',
    credentials: 'include',
    body: JSON.stringify({ name }),
  })
  .then(() => {
    dispatch(receivePatchedGroupName(name))
  })
  // .catch(err => { throw new Error(err) })
}

export const requestFetchGroups = createAction('REQUEST FETCH GROUP')
export const receiveFetchedGroup = createAction('RECEIVE FETCHED GROUP')
export const fetchUserGroups = () => dispatch => {
  dispatch(requestFetchGroups())
  fetch(`${backendAdress}/groups`, {
    ...defaultFetchParams,
    method: 'GET',
    credentials: 'include',
  })
  .then(handleResponseAndDisplayMessage(dispatch))
  .then(res => {
    dispatch(receiveFetchedGroup(res[0]))
  })
  // .catch(err => { throw new Error(err) })
}
