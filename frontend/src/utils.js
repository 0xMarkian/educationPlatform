import history from 'appHistory'

export const parseResponse = res => {
  if (res.status === 401) return history.push('/login')
  return res.json()
}
