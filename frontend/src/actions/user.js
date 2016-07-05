import { createAction } from 'redux-act'

import {backend, defaultHeaders} from '../config'
import {parseJSON} from '../utils'

import {fetchGroup} from 'actions/group'


export const requestUserRegister = createAction('REGISTER NEW USER')
export const receiveRegisteredUser = createAction('REGISTER NEW USER')
export const userRegister = (name, password) => dispatch => {
  dispatch(requestUserRegister())
  dispatch(receivedRegisteredUser())
}

export const requestUserLogin = createAction('LOG USER IN')
export const userLoggedIn = createAction('LOG USER IN')
export const rejectLogin = createAction('REJECT SIGNING IN')
export const userLogin = (name, password) => dispatch => {
  dispatch(requestUserLogin(name))
  fetch(`${backend.protocol}://${backend.ip}:${backend.port}/users/login`, {
    ...defaultHeaders,
    mode:'cors',
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
