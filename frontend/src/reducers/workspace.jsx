import initialState from '../stores/index'

export default (state = initialState, action) => {
  switch(action.type) {
    case 'SHOW_NEW_GROUP_POPUP':
      return { ...state, newGroupPopup: { ...state.newGroupPopup, popupOpen: true } }
    case 'SET_GROUP_NAME_ERROR':
      return { ...state, newGroupPopup: { ...state.newGroupPopup,
        groupName: { ...state.newGroupPopup.groupName, error: true, errorText: action.errorText } } }
    case 'REMOVE_GROUP_NAME_ERROR':
      return { ...state, newGroupPopup: { ...state.newGroupPopup,
        groupName: { ...state.newGroupPopup.groupName, error: false, errorText: null } } }
    default:
      return state
  }
}