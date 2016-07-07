import history from 'appHistory'

export const handleResponse = res => {
  if(res.status === 401) return history.push('/login')
  else return res.json()
}
