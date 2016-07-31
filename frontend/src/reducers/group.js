import { createReducer } from 'redux-act'

import {
  requestCreateGroup,
  receiveCreatedGroup,
  requestFetchGroups,
  receiveFetchedGroup,
  setGroupPopupStep,
} from 'actions/group'


const initialState = {
  data: null,
  createAndPrepareGroupPopupStep: 0,
  requestMethod: 'POST',
  isCreating: false,
  isFetching: false,
}

export default createReducer({
  [setGroupPopupStep]: (state, payload) => ({
    ...state,
    createAndPrepareGroupPopupStep: payload,
  }),
  [requestCreateGroup]: state => ({
    ...state,
    isCreating: true,
  }),
  [receiveCreatedGroup]: (state, payload) => ({
    ...state,
    isCreating: false,
    groupId: payload._id,
    groupName: payload.name,
    requestMethod: 'PATCH',
    createAndPrepareGroupPopupStep: 1,
  }),
  [requestFetchGroups]: state => ({
    ...state,
    isFetching: true,
  }),
  [receiveFetchedGroup]: (state, payload) => ({
    ...state,
    isFetching: false,
    groupId: payload._id,
    groupName: payload.name,
  }),
}, initialState)
