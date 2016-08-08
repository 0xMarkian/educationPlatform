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
      .then(groupId => {
        if(groupId) fetchUserGroups()
      })
      .catch( (err) => {
        console.warn('Pushing to login because of:', err)
        push('login')
      })

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

export default connect( (store) => ({ userStore: store.user, messagesStore: store.messages, }), {
  push,
  fetchUserData,
  fetchUserGroups,
  hideMessage,
})(App)
