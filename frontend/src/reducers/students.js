import { createReducer } from 'redux-act'

import {
  requestStudents,
  receiveStudents,
  addedNewStudent,
  removedAddedStudent,
} from 'actions/students'


const initialState = {
  data: null,
  initiallyCreatedStudents: {},
  isFetching: false,
}

export default createReducer({
  [requestStudents]: state => ({
    ...state,
    isFetching: true,
  }),
  [receiveStudents]: (state, payload) => ({
    ...state,
    data: payload,
    isFetching: false,
  }),
  [addedNewStudent]: (state, payload) => ({
    ...state,
    initiallyCreatedStudents: {
      ...state.initiallyCreatedStudents,
      [payload._id]: payload.name,
    }
  }),
  [removedAddedStudent]: (state, payload) => {
    const initiallyCreatedStudents = { ...state.initiallyCreatedStudents }

    delete initiallyCreatedStudents[payload]
    return {
      ...state,
      initiallyCreatedStudents,
    }
  },
}, initialState)
