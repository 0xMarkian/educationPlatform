import { push } from 'react-router-redux'

import { showLoginError } from 'actions/user'


export const parseResponse = res => {
  if (res.status === 401) return push('/login')
  return res.json()
}

export const parseLoginResponse = res => {
  let json = res.json()
  if(res.status === 401) return json.then(Promise.reject.bind(Promise))
  return json
}
