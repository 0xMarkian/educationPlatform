import {createAction} from 'redux-act'

import { backend, defaultHeaders } from '../config'
import { parseJSON } from '../utils'


export const requestCreateGroup = createAction('REQUEST CREATE GROUP')
export const receiveCreatedGroup = createAction('RECEIVE CREATED GROUP')

export const createGroup = name => dispatch => {
  dispatch(requestCreateGroup())

  fetch(`${backend.ip}:${backend.port}/groups`, {
    ...defaultHeaders,
    method: 'post',
    body: JSON.stringify({ name })
  }).then(parseJSON)
    .then( response => dispatch(receiveCreatedGroup(response)) )
    .catch( err => {throw new Error(err)} )
}
