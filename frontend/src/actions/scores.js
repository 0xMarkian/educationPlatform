import { createAction } from 'redux-act'

import { backendAdress, defaultFetchParams } from '../config'
import { parseJSON, handleResponseAndDisplayMessage } from '../utils'


export const requestScores = createAction('REQUEST SCORES')
export const receiveScores = createAction('RECEIVE SCORES')
export const fetchScores = () => dispatch => {
  dispatch(requestScores())
  fetch(`${backendAdress}/scores?embed=student&embed=course`, {
    ...defaultFetchParams,
    method: 'GET',
    credentials: 'include',
  })
  .then(handleResponseAndDisplayMessage(dispatch))
  .then(res => {
    const studentsScores = {}
    res.forEach(scoreObj => {
      studentsScores[scoreObj.student._id] = {
        ...studentsScores[scoreObj.student._id],
        [scoreObj.course.subject]: {
          scoreId: scoreObj._id,
          scoreValue: scoreObj.scoreValue,
        },
      }
    })
    dispatch(receiveScores(studentsScores))
  })
}

export const appliedNewScore = createAction('NEW SCORE HAS BEEN SUCCESSFULLY APPLIED')
export const applyNewScore = (scoreToUpdateId, student, course, scoreValue) => dispatch => {
  let fetchParams
  let requestURL
  if (scoreToUpdateId) {
    requestURL = `scores/${scoreToUpdateId}`
    fetchParams = {
      method: 'PATCH',
      body: JSON.stringify({ student, course, scoreValue }),
    }
  } else {
    requestURL = 'scores'
    fetchParams = {
      method: 'POST',
      body: JSON.stringify({ student, course, scoreValue }),
    }
  }

  fetch(`${backendAdress}/${requestURL}`, {
    ...defaultFetchParams,
    ...fetchParams,
    credentials: 'include',
  })
  .then(() => {
    dispatch(appliedNewScore(scoreToUpdateId))
  })
  // .catch(err => {throw new Error(err)})
}
