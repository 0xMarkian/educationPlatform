import { createAction } from 'redux-act'

import { backend, defaultFetchParams } from '../config'
import { parseResponse } from '../utils'


// Logging in
export const requestUserLogin = createAction('LOG USER IN')
export const userLoggedIn = createAction('LOG USER IN')
export const rejectLogin = createAction('REJECT SIGNING IN')
export const userLogin = (name, password) => dispatch => {
  dispatch(requestUserLogin(name))
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/users/login`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ name, password }),
  })
  .then(parseResponse)
  .then(res => {
    if (res.success) dispatch(userLoggedIn(name))
    else dispatch(rejectLogin())
  })
  .catch(err => {
    dispatch(rejectLogin())
    throw new Error(err)
  })
}

// Registration
export const requestUserRegistration = createAction('REQUEST USER REGISTRATION')
export const receiveRegisteredUser = createAction('RECEIVE REGISTERED USER')
export const userRegister = (name, password) => dispatch => {
  dispatch(requestUserRegistration())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/users/register`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ name, password }),
  })
  .then(parseResponse)
  .then(() => {
    dispatch(receiveRegisteredUser())
    dispatch(userLogin(name, password))
  })
  .catch(err => {
    throw new Error(err)
  })
}

// Logging out
export const userLogout = createAction('LOG USER OUT')
