import { createReducer } from 'redux-act'

import {
  receiveGroupData,
  setGroupPopupStep,
  iteractWithServerAboutGroup,
} from 'actions/group'


const initialState = {
  createAndPrepareGroupPopupStep: 0,
  isLoading: false,

  data: {},
}

export default createReducer({
  [setGroupPopupStep]: (state, payload) => ({
    ...state,
    createAndPrepareGroupPopupStep: payload,
  }),
  [iteractWithServerAboutGroup]: state => ({
    ...state,
    isLoading: true,
  }),
  [receiveGroupData]: (state, payload) => ({
    ...state,
    isLoading: false,
    data: {
      ...state.data,
      ...payload,
    },
  }),
}, initialState)
