import { createReducer } from 'redux-act'

import {
  requestCreateGroup,
  receiveCreatedGroup
} from 'actions/group'


const initialState = {
  groupData: {},
  isLoading: false
}

export default createReducer({
  [requestCreateGroup]: (state, payload) => ({
    ...state,
    isLoading: true,
  }),
  [receiveCreatedGroup]: (state, payload) => ({
    ...state,
    isLoading: false,
    groupData: payload,
  })
}, initialState)
