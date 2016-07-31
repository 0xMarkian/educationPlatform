import { createAction } from 'redux-act'

import { backendAdress, defaultFetchParams } from '../config'
import { parseJSON, displayMessageAndHandleResponse } from '../utils'


export const requestSubjects = createAction('REQUEST SUBJECTS')
export const receiveSubjects = createAction('RECEIVE SUBJECTS')
export const fetchSubjects = () => dispatch => {
  dispatch(requestSubjects())
  fetch(`${backendAdress}/subjects`, {
    ...defaultFetchParams,
    method: 'GET',
    credentials: 'include',
  })
  .then(parseJSON)
  .then(displayMessageAndHandleResponse(dispatch))
  .then(res => {
    dispatch(receiveSubjects(res))
  })
}
