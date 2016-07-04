import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import user from './user'
import group from './group'


const rootReducer = combineReducers({
  user,
  group,
  routing: routerReducer,
})

export default rootReducer
