import 'normalize.css/normalize.css'
import './styles/App.styl'

import React from 'react'
import { render } from 'react-dom'
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles/'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import history from './appHistory'
import createStore from './store'

import App from './components/App'
import Dashboard from './components/Dashboard'
import NewGroupPopup from './components/Dashboard/CreateGroupPopup'
import Login from './components/Login/'
import Register from './components/Register'


injectTapEventPlugin()

const store = createStore()

const Root = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <main>
        <Router history={syncHistoryWithStore(history, store)}>
          <Route path={'/'} component={App}>
            <Route path={'dashboard'} component={Dashboard} />
            <Route path={'newGroup'} component={NewGroupPopup} />
            <Route path={'login'} component={Login} />
            <Route path={'register'} component={Register} />
          </Route>
        </Router>
      </main>
    </MuiThemeProvider>
  </Provider>
)

render(<Root/>, document.getElementById('app'))

if(module.hot) module.hot.accept()
