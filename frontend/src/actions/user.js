import { createAction } from 'redux-act'

import {backend, defaultHeaders} from '../config'
import {parseJSON} from '../utils'

import {fetchGroup} from 'actions/group'


export const requestUserSignUp = createAction('REGISTER NEW USER')
export const receiveSignUpedUser = createAction('REGISTER NEW USER')
export const userSignUp = (name, password) => dispatch => {
  dispatch(requestUserSignUp())
  dispatch(receivedSignedUpUser())
}

export const requestUserSignIn = createAction('LOG USER IN')
export const userSignedIn = createAction('LOG USER IN')
export const rejectSigningIn = createAction('REJECT SIGNING IN')
export const userSignIn = (name, password) => dispatch => {
  dispatch(requestUserSignIn())

  fetch(`${backend.protocol}://${backend.ip}:${backend.port}/users/signIn`, {
    ...defaultHeaders,
    mode:'cors',
    credentials:'include',
    method: 'POST',
    body: JSON.stringify({ name, password })
  }).then(parseJSON)
    .then(res => {
      if(res.success){
        dispatch(userSignedIn())
        dispatch(fetchGroup())
      }
      else dispatch(rejectSigningIn())
  })
}
