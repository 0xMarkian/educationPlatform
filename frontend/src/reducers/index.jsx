import {combineReducers} from 'redux'
import login from './login'
import workspace from './workspace'

export default combineReducers({
  login,
  workspace
})