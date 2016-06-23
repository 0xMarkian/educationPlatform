require('normalize.css/normalize.css')
require('styles/App.styl')

import React from 'react'
import {connect, Provider} from 'react-redux'
import {createStore} from 'redux'
import initialState from '../stores/index'
import reducers from '../reducers/index'
import LoginPopup from './LoginPopup'
import UserWorkspace from './UserWorkspace'

const store = createStore(reducers, initialState, window.devToolsExtension && window.devToolsExtension())

const ConnectedLoginPopup = connect( (store) => ({ store: store.login }) )(LoginPopup)
const ConnectedUserWorkspace = connect( (store) => ({ store: store.workspace }) )(UserWorkspace)

class AppComponent extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ConnectedLoginPopup />
          <ConnectedUserWorkspace />
        </div>
      </Provider>
    )
  }
}

export default AppComponent