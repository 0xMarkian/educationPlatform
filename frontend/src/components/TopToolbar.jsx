import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle, RaisedButton, Avatar} from 'material-ui'

class TopToolbar extends React.Component {
  render() {
    const store = this.props.store
    const dispatch = this.props.dispatch

    return(
      <Toolbar>
        <ToolbarGroup>
          <Avatar style={{ alignSelf: 'center' }} >A</Avatar>
          <ToolbarTitle text="Manage your groups" style={{ marginLeft: '24px' }}/>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <RaisedButton label="Create new group" primary={true} onClick={ () => {dispatch({ type: 'SHOW_NEW_GROUP_POPUP' })} } />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default TopToolbar