import 'normalize.css/normalize.css'
import 'styles/App.styl'
import React from 'react'
import {Provider} from 'react-redux'

import createStore from '../store'
import LoginPopup from './LoginPopup'
import NewGroupPopup from './NewGroupPopup'
import TopToolbar from './TopToolbar'
import {setCuratorId} from 'actions/common'


const store = createStore()

store.dispatch(setCuratorId('576ea30282d3a8b863e5dc11'))

// TMP
import {setGroupId, setCourseId} from 'actions/common'
store.dispatch(setGroupId('576ea30282d3a8b863e5dc12'))
store.dispatch(setCourseId('5576e93ddc1bc001b1c4ecb8d'))

class AppComponent extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <LoginPopup />
          <NewGroupPopup />
          <TopToolbar />
        </div>
      </Provider>
    )
  }
}

export default AppComponent