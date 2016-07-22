import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchUserData } from 'actions/user'
import { fetchUserGroups } from 'actions/group'


class App extends React.Component {
  componentWillMount() {
    const { children, push, fetchUserData, fetchUserGroups } = this.props

    fetchUserData()
      .then( () => fetchUserGroups() )

    if(!children) push('dashboard')
  }

  render() {
    const { children, user, pathname } = this.props,
      { userNeedsAccount, data: userData,  } = user

    return <div>{ userData || userNeedsAccount ? children : null}</div>
  }
}

export default connect( store => {
  const { user , routing } = store,
    { pathname } = routing.locationBeforeTransitions

  return { user, pathname }
}, {
  push,
  fetchUserData,
  fetchUserGroups,
})(App)
