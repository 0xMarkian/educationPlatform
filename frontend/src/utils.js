import { push } from 'react-router-redux'

export const parseResponse = res => { // ParseJSON
  if(!res) return // TODO: Deal with it

  const { message, status } = res

  if (status >= 400 && status <= 600) return Promise.reject( { message, status, } )

  return res.json()
}

export const startPage = '/dashboard'

export const handleMessage = dispatch => parsedRes => { // displayMessageAndHandleResponse
  //message handle
  return parsedRes.data
}
