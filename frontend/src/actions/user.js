import { createAction } from 'redux-act'
import { push } from 'react-router-redux'

import { fetchUserGroups } from 'actions/group'
import { backendAdress, defaultFetchParams } from '../config'
import { parseJSON, parseLoginResponse, startPage, displayMessageAndHandleResponse } from '../utils'


export const receivedUserData = createAction('RECEIVED USER DATA')
export const iteractWithServerAboutUser = createAction('iteractWithServerAboutUser')


// Fetching data
export const fetchUserData = () => dispatch => {
  return fetch(`${backendAdress}/users/me`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'GET',
  })
  .then(parseJSON)
  .then( displayMessageAndHandleResponse(dispatch) )
  .then(res => dispatch(receivedUserData(res)))
  .catch( () => { return Promise.reject() })
}




// Logging in
export const rejectLogin = createAction('REJECT SIGNING IN')
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
      dispatch( receivedUserData(res) )
      dispatch( push(startPage) )
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
      .then( data => {
        dispatch(receivedUserData(data))
        dispatch(push(startPage))
      })
      .catch(err => {
        throw new Error(err)
      })
}


// Logging out
export const userLogout = () => dispatch => {
  fetch(`${backendAdress}/users/logout`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'POST',
  })
  .then( () => location.reload() )
}

export const removeLoginErrors = createAction('REMOVE LOGIN ERROR')
