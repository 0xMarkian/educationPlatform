import 'core-js/fn/object/assign'
import 'normalize.css/normalize.css'
import 'styles/App.styl'
import React from 'react'
import history from './appHistory'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, Route, Link } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import createStore from './store'
import App from './components/App'
import Header from './components/Header/'
import SignInPopup from './components/Login/SignInSection'
import ScoresTable from './components/Dashboard/ScoresTableSection/'
import NewGroupPopup from './components/Dashboard/CreateGroupPopup'


const store = createStore()

//TMP:
import {userSignIn} from 'actions/user'
store.dispatch(userSignIn('test', 'test'))


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <main>
        <Router history={syncHistoryWithStore(history, store)}>
          <Route path='/' component={App}>
            <Route path='signIn' component={SignInPopup} />
            <Route path='newGroup' component={NewGroupPopup} />
          </Route>
        </Router>
      </main>
    </MuiThemeProvider>
  </Provider>
, document.getElementById('app'))
injectTapEventPlugin()

if(module.hot) module.hot.accept()
