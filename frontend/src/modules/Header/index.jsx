import { styles } from './styles'

import React from 'react'
import { connect } from 'react-redux'
import { css } from 'aphrodite'
import { Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator, Avatar, RaisedButton } from 'material-ui'

import { userLogout } from 'actions/user'


class Header extends React.Component {
  render() {
    const { userLogout, groupName, userName } = this.props

    return(
      <Toolbar>
        <ToolbarGroup>
          <Avatar className={css(styles.avatar)}>
          {
            userName ? userName[0].toUpperCase() : 'U'
          }
          </Avatar>
          <ToolbarTitle text={groupName} className={css(styles.headerTitle)} />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <RaisedButton
            label="Log out"
            primary={true}
            onTouchTap={userLogout} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default connect(store => {
  const { name: userName } = store.user.data
  const { name: groupName } = store.group

  return { userName, groupName }
}, {
  userLogout,
})(Header)
