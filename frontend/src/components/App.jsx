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

 
if(module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers/index').default
    store.replaceReducer(nextRootReducer)
  });
}

const ConnectedLoginPopup = connect( (store) => ({ store: store.login }) )(LoginPopup)
const ConnectedUserWorkspace = connect( (store) => ({ store: store.workspace }) )(UserWorkspace)


store.dispatch({ type: 'SET_CURATOR_ID', id: '57646aa30bbf78d02d29f70e' })

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