import { showMessage } from 'actions/message'

export const startPage = '/dashboard'

export const handleResponseAndDisplayMessage = dispatch => res => {
  const handle = resBody => {
    const {data, message, errors} = resBody

    if (message) dispatch(showMessage(message))

    if (res.status < 200 || res.status >= 400){
      return Promise.reject(errors || res.statusText)
    }

    return (data || {})
  }

  return res.json().then(handle).catch(() => handle({}))
}
