import {combineReducers} from 'redux'

import common from './common'
import user from './user'
import group from './group'
import newGroupPopup from './newGroupPopup'


const rootReducer = combineReducers({
  common,
  user,
  group,
  newGroupPopup
})

export default rootReducer
