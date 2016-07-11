import { createAction } from 'redux-act'

import { backendAdress, defaultFetchParams } from '../config'
import { parseResponse } from '../utils'


export const setGroupPopupStep = createAction('SET GROUP POPUP STEP')

export const requestCreateGroup = createAction('REQUEST CREATE GROUP')
export const receiveCreatedGroup = createAction('RECEIVE CREATED GROUP')
export const createGroup = (name, method) => dispatch => {
  dispatch(requestCreateGroup())
  fetch(`${backendAdress}/groups`, {
    ...defaultFetchParams,
    method,
    credentials: 'include',
    body: JSON.stringify({ name }),
  })
  .then(parseResponse)
  .then(res => {
    dispatch(receiveCreatedGroup(res))
  })
  .catch(err => { throw new Error(err) })
}

export const requestFetchGroup = createAction('REQUEST FETCH GROUP')
export const receiveFetchedGroup = createAction('RECEIVE FETCHED GROUP')
export const fetchGroup = () => dispatch => {
  dispatch(requestFetchGroup())
  fetch(`${backendAdress}/groups`, {
    ...defaultFetchParams,
    method: 'GET',
    credentials: 'include',
  })
  .then(parseResponse)
  .then(res => {
    dispatch(receiveFetchedGroup(res[0]))
  })
  .catch(err => { throw new Error(err) })
}
