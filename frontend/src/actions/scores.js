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
          courseId: scoreObj.course._id,
          scoreValue: scoreObj.scoreValue,
        },
      }
    })
    dispatch(receiveScores(studentsScores))
  })
}

export const applyNewScore = (student, course, scoreValue) => () => {
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/scores`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ student, course, scoreValue }),
  })
  .then(() => {
    // console.log('A new score has been successfully applied!')
  })
  .catch(err => {
    throw new Error(err)
  })
}
