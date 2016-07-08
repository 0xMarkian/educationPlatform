import history from 'appHistory'

export const handleResponse = res => {
  if (res.status === 401) return history.push('/login')
  return res.json()
}
