import { styles } from './styles'

import React from 'react'
import { connect } from 'react-redux'
import { css } from 'aphrodite'
import { Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator, Avatar, RaisedButton } from 'material-ui'

import { userLogout } from 'actions/user'


class Header extends React.Component {
  render() {
    const { groupStore, userLogout } = this.props

    return(
      <Toolbar>
        <ToolbarGroup>
          <Avatar className={css(styles.avatar)}>
          {
            this.props.userStore.name ? this.props.userStore.name[0].toUpperCase() : 'U'
          }
          </Avatar>
          <ToolbarTitle text={groupStore.groupName} className={css(styles.headerTitle)} />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <RaisedButton
            label="Log out"
            primary={true}
            onClick={userLogout} />
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
