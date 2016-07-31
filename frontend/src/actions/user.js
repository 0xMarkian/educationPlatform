import { createAction } from 'redux-act'
import { push } from 'react-router-redux'

import { backendAdress, defaultFetchParams } from '../config'
import { parseJSON, startPage, displayMessageAndHandleResponse } from '../utils'


export const receivedUserData = createAction('RECEIVED USER DATA')
export const iteractWithServerAboutUser = createAction('iteractWithServerAboutUser')


// Fetching data
export const fetchUserData = () => dispatch =>
  fetch(`${backendAdress}/users/me`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'GET',
  })
  .then(parseJSON)
  .then(displayMessageAndHandleResponse(dispatch))
  .then(res => dispatch(receivedUserData(res)))
  .catch(() => Promise.reject())


// Logging in
export const rejectLogin = createAction('REJECT LOGGING IN')
export const userLogin = (name, password) => dispatch => {
  dispatch(iteractWithServerAboutUser(name))

  fetch(`${backendAdress}/users/login`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ name, password }),
  })
    .then(parseJSON)
    .then(displayMessageAndHandleResponse(dispatch))
    .then(res => {
      dispatch(receivedUserData(res))
      dispatch(push(startPage))
    })
    .catch(errors => {
      dispatch(rejectLogin(errors))
    })
}


// Registration
export const userRegister = (name, password) => dispatch => {
  dispatch(iteractWithServerAboutUser())
  fetch(`${backendAdress}/users/register`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ name, password }),
  })
    .then(parseJSON)
    .then(displayMessageAndHandleResponse(dispatch))
      .then(data => {
        dispatch(receivedUserData(data))
        dispatch(push(startPage))
      })
      .catch(err => {
        throw new Error(err)
      })
}


// Logging out
export const userLogout = () => () => {
  fetch(`${backendAdress}/users/logout`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'POST',
  })
  .then(() => location.reload())
}

export const removeLoginErrors = createAction('REMOVE LOGIN ERRORS')
