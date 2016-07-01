import React from 'react'
import {connect} from 'react-redux'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle, RaisedButton, Avatar} from 'material-ui'

import {
  showNewGroupPopup
} from 'actions/group'


class TopToolbar extends React.Component {
  render() {
    const { showNewGroupPopup } = this.props

    return(
      <Toolbar>
        <ToolbarGroup>
          <Avatar style={{ alignSelf: 'center' }} >A</Avatar>
          <ToolbarTitle text="Manage your groups" style={{ marginLeft: '24px' }}/>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <RaisedButton
            label="Create new group"
            primary={true}
            onClick={showNewGroupPopup} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default connect(null, { showNewGroupPopup })(TopToolbar)
