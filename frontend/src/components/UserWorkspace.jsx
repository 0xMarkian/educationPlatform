import React from 'react'
import TopToolbar from './TopToolbar.jsx'
import NewGroupPopup from './NewGroupPopup.jsx'

if(module.hot){ module.hot.accept() }

const UserWorkspace = React.createClass({
  render() {
    const store = this.props.store
    const dispatch = this.props.dispatch

    return(
      <div>
        <TopToolbar store={store} dispatch={dispatch} />
        <NewGroupPopup store={store} dispatch={dispatch} />
      </div>
    )
  }
})

export default UserWorkspace