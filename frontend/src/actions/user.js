import { createAction } from 'redux-act'
import { push } from 'react-router-redux'

import { fetchGroup } from 'actions/group'
import { backend, defaultFetchParams } from '../config'
import { parseResponse, parseLoginResponse } from '../utils'


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
    dispatch(fetchGroup())
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
  .then(parseLoginResponse)
  .then(res => {
    dispatch(fetchGroup())
    dispatch(userLoggedIn(res.name))
    dispatch(push('dashboard'))
  })
  .catch(err => {
    dispatch(rejectLogin(err.message))
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
    dispatch(push('dashboard'))
  })
  .catch(err => {
    throw new Error(err)
  })
}

// Logging out
export const userLoggedOut = createAction('USER LOGGED OUT')
export const userLogout = () => dispatch => {
  fetch(`${backend}/users/logout`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'POST',
  })
  .then(() => {
    dispatch(userLoggedOut())
    dispatch(push('/login'))
  })
}

export const removeLoginError = createAction('REMOVE LOGIN ERROR')
