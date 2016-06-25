import initialState from '../stores/index'

export default (state = initialState, action) => {
  switch(action.type) {
    case 'SET_CURATOR_ID':
      return { ...state, curatorId: action.id }
    case 'SET_GROUP_ID':
      return { ...state, groupId: action.id }
    case 'SET_COURSE_ID':
      return { ...state, courseId: action.id}
    case 'SHOW_NEW_GROUP_POPUP':
      return { ...state, newGroupPopup: { ...state.newGroupPopup, popupOpen: true } }
    case 'GROUP_NAME_INPUT':
      return { ...state, newGroupPopup: { ...state.newGroupPopup,
        groupName: { ... state.newGroupPopup.groupName, value: action.value } } }
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