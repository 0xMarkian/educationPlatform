import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import user from './user'
import group from './group'
import students from './students'
import subjects from './subjects'
import scores from './scores'
import courses from './courses'
import messages from './messages'


const rootReducer = combineReducers({
  user,
  group,
  courses,
  students,
  subjects,
  scores,
  messages,
  routing: routerReducer,
})

export default rootReducer
