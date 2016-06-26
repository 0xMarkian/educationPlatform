import {createAction} from 'redux-act'

export const requestSubjectsList = createAction('REQUEST SUBJECTS LIST')
export const receiveSubjectsList = createAction('RECEIVE SUBJECTS LIST')

export const fetchSubjectsList = url =>
  dispatch => {
    dispatch(requestSubjectsList())
    fetch(url, {
      mode: 'cors',
      method: 'GET'
    }).then(response => response.json())
      .then(response => {
         dispatch(receiveSubjectsList(response))
    })
      .catch(exception => {
         throw Error(exception)
    })
  }
