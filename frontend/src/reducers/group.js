import { createReducer } from 'redux-act'

import {
  requestCreateGroup,
  receiveCreatedGroup,
  requestPatchGroupName,
  receivePatchedGroupName,
  requestFetchGroups,
  receiveFetchedGroup,
  setGroupPopupStep,
} from 'actions/group'


const initialState = {
  createAndPrepareGroupPopupStep: 0,
  isLoading: false,
}

export default createReducer({
  [setGroupPopupStep]: (state, payload) => ({
    ...state,
    createAndPrepareGroupPopupStep: payload,
  }),
  [requestCreateGroup]: state => ({
    ...state,
    isLoading: true,
  }),
  [receiveCreatedGroup]: (state, payload) => ({
    ...state,
    isLoading: false,
    groupId: payload._id,
    groupName: payload.name,
    createAndPrepareGroupPopupStep: 1,
  }),
  [requestPatchGroupName]: state => ({
    ...state,
    isLoading: true,
  }),
  [receivePatchedGroupName]: (state, payload) => ({
    ...state,
    isLoading: false,
    groupName: payload,
  }),
  [requestFetchGroups]: state => ({
    ...state,
    isLoading: true,
  }),
  [receiveFetchedGroup]: (state, payload) => ({
    ...state,
    isLoading: false,
    groupId: payload._id,
    groupName: payload.name,
  }),
}, initialState)
