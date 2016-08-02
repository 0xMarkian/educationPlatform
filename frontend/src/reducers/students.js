import { createReducer } from 'redux-act'

import {
  requestStudents,
  receiveStudents,
  requestAddingNewStudent,
  addedNewStudent,
  removedAddedStudent,
} from 'actions/students'


const initialState = {
  data: null,
  isLoading: false,
  initiallyCreatedStudents: [],
}

export default createReducer({
  [requestStudents]: state => ({
    ...state,
    isLoading: true,
  }),
  [receiveStudents]: (state, payload) => ({
    ...state,
    data: payload,
    isLoading: false,
  }),
  [requestAddingNewStudent]: state => ({
    ...state,
    isLoading: true,
  }),
  [addedNewStudent]: (state, payload) => ({
    ...state,
    isLoading: false,
    initiallyCreatedStudents: [
      ...state.initiallyCreatedStudents,
      payload,
    ],
  }),
  [removedAddedStudent]: (state, payload) => {
    let studentToDeleteIndex = null

    state.initiallyCreatedStudents.find((student, i) => {
      if (student._id === payload) {
        studentToDeleteIndex = i
        return true
      }
      return false
    })

    return {
      ...state,
      initiallyCreatedStudents: [
        ...state.initiallyCreatedStudents.slice(0, studentToDeleteIndex),
        ...state.initiallyCreatedStudents.slice(studentToDeleteIndex + 1),
      ],
    }
  },
}, initialState)
