import 'normalize.css/normalize.css'
import 'styles/App.styl'

import React from 'react'
import {Provider} from 'react-redux'

import createStore from '../store'
import LoginPopup from './LoginPopup'
// import UserWorkspace from './UserWorkspace'

const store = createStore()

store.dispatch({ type: 'SET_CURATOR_ID', id: '57646aa30bbf78d02d29f70e' })

class AppComponent extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <LoginPopup />
          {/*<UserWorkspace />*/}
        </div>
      </Provider>
    )
  }
}

export default AppComponent