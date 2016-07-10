import { createReducer } from 'redux-act'

import {
  requestCreateGroup,
  receiveCreatedGroup,
  requestFetchGroup,
  receiveFetchedGroup,
  setGroupPopupStep,
} from 'actions/group'


const initialState = {
  data: null,
  newGroupPopupStep: 2,
  requestMethod: 'POST',
  isCreating: false,
  isFetching: false,
}

export default createReducer({
  [setGroupPopupStep]: (state, payload) => ({
    ...state,
    newGroupPopupStep: payload,
  }),
  [requestCreateGroup]: state => ({
    ...state,
    isCreating: true,
  }),
  [receiveCreatedGroup]: (state, payload) => ({
    ...state,
    isCreating: false,
    groupData: payload,
    requestMethod: 'PATCH',
    newGroupPopupStep: 1,
  }),
  [requestFetchGroup]: state => ({
    ...state,
    isFetching: true,
  }),
  [receiveFetchedGroup]: (state, payload) => ({
    ...state,
    isFetching: false,
    data: payload,
  }),
}, initialState)
