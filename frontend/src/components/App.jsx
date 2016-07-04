import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class App extends React.Component {
  componentWillMount() {
    const { children, push } = this.props

    if(!children) push('/dashboard')
  }

  render() {
    const { children } = this.props

    return <div>{children}</div>
  }
}

export default connect(null, {
  push,
})(App)
