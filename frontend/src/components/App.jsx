import React from 'react'


class App extends React.Component {
  componentWillMount() {
    const { children } = this.props

    if(!children) push('dashboard')
  }

  render() {
    const { children } = this.props

    return <div>{children}</div>
  }
}

export default App
