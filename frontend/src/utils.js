import { push } from 'react-router-redux'

import { showMessage } from 'actions/messages'


export const parseJSON = res => res.json()

export const startPage = '/dashboard'

export const displayMessageAndHandleResponse = dispatch => parsedRes => {
  const { data, message, errors } = parsedRes

  console.log(parsedRes)
  if(message) {
    dispatch(showMessage(message))
  }

  if(errors) {
    return Promise.reject(errors)
  }

  return data
}
