import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import common from './common'
import user from './user'
import group from './group'
import newGroupPopup from './newGroupPopup'


const rootReducer = combineReducers({
  user,
  group,
  routing: routerReducer,
})

export default rootReducer
