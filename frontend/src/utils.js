import { showMessage } from 'actions/message'


export const parseJSON = res => res.json()

export const startPage = '/dashboard'

export const displayMessageAndHandleResponse = dispatch => parsedRes => {
  const { data, message, errors } = parsedRes

  if (message) {
    dispatch(showMessage(message))
  }

  if (errors) {
    return Promise.reject(errors)
  }

  return data
}
