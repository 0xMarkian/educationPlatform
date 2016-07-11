import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchUserData } from 'actions/user'


class App extends React.Component {
  componentWillMount() {
    const { children,push, fetchUserData } = this.props

    fetchUserData()
    if(!children) push('dashboard')
  }

  render() {
    const { children } = this.props

    return <div>{children}</div>
  }
}

export default connect(null, {push, fetchUserData })(App)
