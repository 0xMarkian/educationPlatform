import {combineReducers} from 'redux'
import common from './common'
import user from './user'
import newGroupPopup from './newGroupPopup'


const rootReducer = combineReducers({
  common,
  user,
  newGroupPopup
})

export default rootReducer
