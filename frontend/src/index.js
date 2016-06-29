import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './components/App'


ReactDOM.render(<App />, document.getElementById('app'))
injectTapEventPlugin()

if(module.hot) module.hot.accept()
