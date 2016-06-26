import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './components/App'


injectTapEventPlugin()

module.hot ? module.hot.accept() : null

ReactDOM.render(<MuiThemeProvider muiTheme={getMuiTheme()}><App /></MuiThemeProvider>, document.getElementById('app'))
