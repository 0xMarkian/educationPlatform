import {combineReducers} from 'redux'
import common from './common'
import login from './login'
import newGroupPopup from './newGroupPopup'


const rootReducer = combineReducers({
  common,
  login,
  newGroupPopup
})

export default rootReducer