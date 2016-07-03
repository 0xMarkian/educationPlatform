import 'normalize.css/normalize.css'
import 'styles/App.styl'


import React from 'react'
import { Provider } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import createStore from '../store'

import SignInPopup from './Login/SignInSection'
import NewGroupPopup from './Dashboard/CreateGroupPopup'
import Header from './Header/'
import ScoresTable from './Dashboard/ScoresTableSection/'


const store = createStore()

//TMP:
import {userSignIn} from 'actions/user'

store.dispatch( userSignIn('test', 'test') )

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <main>
            <SignInPopup />
            <NewGroupPopup />
            <Header />
            <ScoresTable />
          </main>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
