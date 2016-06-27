import 'normalize.css/normalize.css'
import 'styles/App.styl'


import React from 'react'
import { Provider } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import createStore from '../store'

import LoginPopup from './LoginPopup'
import NewGroupPopup from './NewGroupPopup'
import TopToolbar from './Header/index'

import {setCuratorId} from 'actions/common'


const store = createStore()

//TMP:
store.dispatch(setCuratorId('576ea30282d3a8b863e5dc11'))

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <main>
            <LoginPopup />
            <NewGroupPopup />
            <TopToolbar />
          </main>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
