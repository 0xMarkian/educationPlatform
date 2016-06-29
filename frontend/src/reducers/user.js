import {createReducer} from 'redux-act'

import {
  fieldInput,
  setFieldError,
  removeFieldError
} from 'actions/user'


const initialState = {
  name: null,
  token: null,
  groupId: null,
}

export default createReducer({

}, initialState)
