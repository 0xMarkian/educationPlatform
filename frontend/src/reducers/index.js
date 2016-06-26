import {combineReducers} from 'redux'
import login from './login'
import workspace from './workspace'


const rootReducer = combineReducers({
  login,
  workspace
})

export default rootReducer