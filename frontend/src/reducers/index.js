import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import user from './user'
import group from './group'
import students from './students'
import subjects from './subjects'
import scores from './scores'


const rootReducer = combineReducers({
  user,
  group,
  students,
  subjects,
  scores,
  routing: routerReducer,
})

export default rootReducer
