import { createReducer } from 'redux-act'

import {
  openNewGroupPopup,
  closeNewGroupPopup,
  requestCreateGroup,
  receiveCreatedGroup,
  requestFetchGroup,
  receiveFetchedGroup
} from 'actions/group'


const initialState = {
  groupData: {},
  newGroupPopup: {
    open: false,
    step: 0
  },
  isCreating: false,
  isFetching: false
}

export default createReducer({
  [openNewGroupPopup]: state => ({
    ...state,
    newGroupPopupOpen: true
  }),
  [closeNewGroupPopup]: state => ({
    ...state,
    newGroupPopupOpen: false
  }),
  [requestCreateGroup]: state => ({
    ...state,
    isCreating: true,
  }),
  [receiveCreatedGroup]: (state, payload) => ({
    ...state,
    isCreating: false,
    groupData: payload
  }),
  [requestFetchGroup]: (state, payload) => ({
    ...state,
    isFetching: true,
  }),
  [receiveFetchedGroup]: (state, payload) => ({
    ...state,
    isFetching: false,
    groupData: payload
  }),
}, initialState)
