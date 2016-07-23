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
      .catch( () => push('login') )

    //auto redirect to dahsboard
    if(!children) push('dashboard')
  }

  render() {
    const { children } = this.props

    return <div>{ children }</div>
  }
}

export default connect( null, {
  push,
  fetchUserData,
  fetchUserGroups,
})(App)
