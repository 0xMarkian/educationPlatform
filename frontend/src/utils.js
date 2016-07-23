import { push } from 'react-router-redux'

export const parseResponse = (res) => {
  const { message, status } = res
  if (status >= 400 && status <= 600) return Promise.reject( { message, status, } )

  return res.json()
}

export const startPage = '/dashboard'

export const parseLoginResponse = res => {
  let json = res.json()
  if(res.status === 401) return json.then(Promise.reject.bind(Promise))
  return json
}
