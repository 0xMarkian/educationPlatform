import { createReducer } from 'redux-act'

import {
  showNewGroupPopup,
  hideNewGroupPopup,
  requestCreateGroup,
  receiveCreatedGroup
} from 'actions/group'


const initialState = {
  groupData: {},
  newGroupPopupOpen: false,
  isLoading: false,
}

export default createReducer({
  [showNewGroupPopup]: state => ({
    ...state,
    newGroupPopupOpen: true
  }),
  [hideNewGroupPopup]: state => ({
    ...state,
    newGroupPopupOpen: false
  }),
  [requestCreateGroup]: state => ({
    ...state,
    isLoading: true,
  }),
  [receiveCreatedGroup]: (state, payload) => ({
    ...state,
    isLoading: false,
    groupData: payload,
  })
}, initialState)
