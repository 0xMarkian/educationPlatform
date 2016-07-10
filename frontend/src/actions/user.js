import { createAction } from 'redux-act'

import { backend, defaultFetchParams } from '../config'
import { parseResponse } from '../utils'


// Fetching data
export const receivedUserData = createAction('RECEIVED USER DATA')
export const fetchUserData = () => dispatch => {
  fetch(`${backend}/users/me`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'GET',
  })
  .then(parseResponse)
  .then((res) => {
    console.log(res)
    dispatch(receivedUserData(res))
  })
}

// Logging in
export const requestUserLogin = createAction('LOG USER IN')
export const userLoggedIn = createAction('LOG USER IN')
export const rejectLogin = createAction('REJECT SIGNING IN')
export const userLogin = (name, password) => dispatch => {
  dispatch(requestUserLogin(name))
  fetch(`${backend}/users/login`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ name, password }),
  })
  .then(parseResponse)
  .then(res => {
    dispatch(userLoggedIn(name))
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
  fetch(`${backend}/users/register`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ name, password }),
  })
  .then(parseResponse)
  .then(() => {
    dispatch(receiveRegisteredUser())
  })
  .catch(err => {
    throw new Error(err)
  })
}

// Logging out
export const userLogout = createAction('LOG USER OUT')
