import {createReducer} from 'redux-act'

import {
  fieldInput,
  setFieldError,
  removeFieldError
} from 'actions/login'


const initialState = {
  username: {
    value: null,
    error: true,
    errorText: null
  },
  password: {
    value: null,
    error: true,
    errorText: null
  },
  retypedPassword: {
    value: null,
    error: true,
    errorText: null
  }
}

export default createReducer({
  [fieldInput]: (state, payload) => ({
    ...state,
    [payload.name]: { ...state[payload.name], value: payload.value }
  }),
  [setFieldError]: (state, payload) => ({
    ...state,
    [payload.name]: { ...state[payload.name], error: true, errorText: payload.errorText }
  }),
  [removeFieldError]: (state, payload) => ({
    ...state,
    [payload.name]: { ...state[payload.name], error: false, errorText: null }
  })
}, initialState)