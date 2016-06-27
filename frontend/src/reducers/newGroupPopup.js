import {createReducer} from 'redux-act'

import {
  showNewGroupPopup,
  hideNewGroupPopup,
  groupNameInput,
  setGroupNameError,
  removeGroupNameError,
  sendGroupName,
  stopFetchingGroupName,
  setCurrentStep
} from 'actions/newGroupPopup'


const initialState = {
  popupOpen: false,
  currentStep: 0,
  groupName: {
    value: null,
    error: true,
    errorText: null,
    isFetching: false,
    fetchMethod: 'POST'
  }
}

export default createReducer({
  [showNewGroupPopup]: state => ({
    ...state,
    popupOpen: true
  }),
  [hideNewGroupPopup]: state => ({
    ...state,
    popupOpen: false
  }),
  [setCurrentStep]: (state, payload) => ({
    ...state,
      currentStep: payload
  }),
  [groupNameInput]: (state, payload) => ({
    ...state,
    groupName: { ...state.groupName, value: payload }
  }),
  [setGroupNameError]: (state, payload) => ({
    ...state,
    groupName: { ...state.groupName, error: true, errorText: payload }
  }),
  [removeGroupNameError]: state => ({
    ...state,
    groupName: { ...state.groupName, error: false, errorText: null }
  }),
  [sendGroupName]: state => ({
    ...state,
    groupName: { ...state.groupName, isFetching: true }
  }),
  [stopFetchingGroupName]: state => ({
    ...state,
    groupName: { ...state.groupName, fetchMethod: 'PATCH', isFetching: false }
  })
}, initialState)