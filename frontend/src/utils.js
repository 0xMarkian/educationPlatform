import { showMessage } from 'actions/message'

export const startPage = '/dashboard'

export const handleResponseAndDisplayMessage = dispatch => res => {
  const handle = resBody => {
    const {data, message, errors} = resBody

    if (message) dispatch(showMessage(message))

    if (res.status < 200 || res.status >= 400){
      let errorText = res.statusText

      if(errors) errorText = errors.name
      dispatch(showMessage(errorText))
      return Promise.reject(errors)
    }

    return (data || {})
  }

  return res.json().then(handle).catch(() => handle({}))
}
