import initialState from '../stores/index'

export default (state = initialState, action) => {
  switch(action.type) {
    case 'USERNAME_INPUT':
      return { ...state,
               username: { ...state.username, value: action.value }
             }
    case 'SET_USERNAME_ERROR':
      return { ...state,
               username: { ...state.username, error: true, errorText: action.errorText }
      }
    case 'REMOVE_USERNAME_ERROR':
      return { ...state,
               username: {value: state.username.value, error: false, errorText: null }
      }
    case 'PASSWORD_INPUT':
      return { ...state,
               password: { ...state.password, value: action.value }
      }
    case 'SET_PASSWORD_ERROR':
      return { ...state,
               password: { ...state.password, error: true, errorText: action.errorText }
      }
    case 'REMOVE_PASSWORD_ERROR':
      return { ...state,
               password: { ...state.password, error: false, errorText: null }
      }
    case 'RETYPED_PASSWORD_INPUT':
      return { ...state,
               retypedPassword: { ...state.retypedPassword, value: action.value }
      }
    case 'SET_RETYPED_PASSWORD_ERROR':
      return { ...state,
               retypedPassword: { ...state.retypedPassword, error: true, errorText: action.errorText }
      }
    case 'REMOVE_RETYPED_PASSWORD_ERROR':
      return { ...state,
               retypedPassword: { ...state.retypedPassword, error: false, errorText: null }
      }
    default:
      return state
  }
}