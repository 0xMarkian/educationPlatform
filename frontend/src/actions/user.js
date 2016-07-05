import { createAction } from 'redux-act'

import { backend, defaultFetchParams } from '../config'
import { parseJSON } from '../utils'

import { fetchGroup } from 'actions/group'

// Registration
export const requestUserRegistration = createAction('REQUEST USER REGISTRATION')
export const receivedRegisteredUser = createAction('RECEIVED REGISTERED USER')
export const userRegister = (username, password) => dispatch => {
  dispatch(requestUserRegistration())
  console.log(JSON.stringify({ name: username, password }))
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/users/register`, {
    ...defaultFetchParams,
    credentials:'include',
    method: 'POST',
    body: JSON.stringify({ name: username, password })
  }).then(parseJSON)
    .then(res => {
      if(res.success){
        dispatch(receivedRegisteredUser())
      }
    })
}

//Logination
export const requestUserLogin = createAction('LOG USER IN')
export const userLoggedIn = createAction('LOG USER IN')
export const rejectLogin = createAction('REJECT SIGNING IN')
export const userLogin = (name, password) => dispatch => {
  dispatch(requestUserLogin(name))
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/users/login`, {
    ...defaultFetchParams,
    credentials:'include',
    method: 'POST',
    body: JSON.stringify({ name, password })
  }).then(parseJSON)
    .then(res => {
      if(res.success){
        dispatch(userLoggedIn())
        dispatch(fetchGroup())
      }
      else dispatch(rejectLogin())
  })
}
