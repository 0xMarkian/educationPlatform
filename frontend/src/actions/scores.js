import { createAction } from 'redux-act'

import { backend, defaultFetchParams } from '../config'
import { handleResponse } from '../utils'
import { updateStudentWithScore } from './students'

export const requestScores = createAction('REQUEST SCORES')
export const receiveScores = createAction('RECEIVE SCORES')
export const fetchScores = () => dispatch => {
  dispatch(requestScores())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/scores?embed=student&embed=course`, {
    ...defaultFetchParams,
    method: 'GET',
    credentials: 'include',
  })
  .then(handleResponse)
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

export const applyNewScore = (student, course, scoreValue, scoreToUpdateId) => () => {
  let fetchParams, requestURL
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
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/${requestURL}`, {
    ...defaultFetchParams,
    ...fetchParams,
    credentials: 'include',
  })
  .then(() => {
    // console.log('A new score has been successfully applied!')
  })
  .catch(err => {
    throw new Error(err)
  })
}
