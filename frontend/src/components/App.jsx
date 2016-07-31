import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Snackbar } from 'material-ui'
import { fetchUserData } from 'actions/user'
import { fetchUserGroups } from 'actions/group'

import { hideMessage } from 'actions/message'


class App extends React.Component {
  componentWillMount() {
    const { children, push, fetchUserData, fetchUserGroups } = this.props

    fetchUserData()
      .then( () => fetchUserGroups() )
      .catch( () => push('login') )

    //auto redirect to dahsboard
    if(!children) push('dashboard')
  }

  render() {
    const { children, messagesStore, hideMessage } = this.props
    const { messageText } = messagesStore

    return <div>
      { children }
      <Snackbar
        message={messageText || ''}
        open={!!messageText}
        autoHideDuration={2000}
        onRequestClose={hideMessage}
      />
    </div>
  }
}

export default connect( (store) => ({ messagesStore: store.messages }), {
  push,
  fetchUserData,
  fetchUserGroups,
  hideMessage,
})(App)
