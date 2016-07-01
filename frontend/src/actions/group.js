import {createAction} from 'redux-act'

import { backend, defaultHeaders } from '../config'
import { parseJSON } from '../utils'


export const showNewGroupPopup = createAction('SHOW NEW GROUP POPUP')
export const hideNewGroupPopup = createAction('HIDE NEW GROUP POPUP')

export const requestCreateGroup = createAction('REQUEST CREATE GROUP')
export const receiveCreatedGroup = createAction('RECEIVE CREATED GROUP')

export const createGroup = name => dispatch => {
  dispatch(requestCreateGroup())
  fetch(`${backend.protocol}://${backend.ip}:${backend.port}/groups`, {
    ...defaultHeaders,
    method: 'POST',
    body: JSON.stringify({ name })
  }).then(parseJSON)
    .then( res => {dispatch(receiveCreatedGroup(res))} )
    .catch( err => {throw new Error(err)} )
}
