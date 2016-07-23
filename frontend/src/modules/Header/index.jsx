import { styles } from './styles'

import React from 'react'
import { connect } from 'react-redux'
import { css } from 'aphrodite'
import { Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator, Avatar, RaisedButton } from 'material-ui'

import { userLogout } from '../../actions/user'


class Header extends React.Component {
  render() {
    const { groupStore, userLogout, userStore } = this.props,
      { data: userData } = userStore

    return(
      <Toolbar>
        <ToolbarGroup>
          <Avatar className={css(styles.avatar)}>
          {
            userData ? userData.name[0].toUpperCase() : 'U'
          }
          </Avatar>
          <ToolbarTitle text={groupStore.groupName} className={css(styles.headerTitle)} />
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

export default connect(store => ({
  userStore: store.user,
  groupStore: store.group,
}), {
  userLogout,
})(Header)
