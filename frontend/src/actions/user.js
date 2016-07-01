import { createAction } from 'redux-act'

import {backend, defaultHeaders} from '../config'
import {parseJSON} from '../utils'


export const requestUserSignUp = createAction('REGISTER NEW USER')
export const receivedSignUpedUser = createAction('REGISTER NEW USER')
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
    headers: {
     ...defaultHeaders.headers,
     'Access-Control-Allow-Methods': 'POST,GET,OPTIONS'
    },
    method: 'OPTIONS'
  }).then(() => {
  
    fetch(`${backend.protocol}://${backend.ip}:${backend.port}/users/signIn`, {
      headers: {
        ...defaultHeaders.headers,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      },
      method: 'POST',
      body: JSON.stringify({ name, password })
    }).then(parseJSON)
      .then(res => {
        if(res.success) dispatch(userSignedIn())
        else dispatch(rejectSigningIn())
    })

  })
}
