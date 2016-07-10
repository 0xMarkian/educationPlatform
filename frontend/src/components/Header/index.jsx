import { styles } from './styles'

import React from 'react'
import { connect } from 'react-redux'
import { css } from 'aphrodite'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle, RaisedButton, Avatar } from 'material-ui'

import history from 'appHistory'


class Header extends React.Component {
  render() {
    return(
      <Toolbar>
        <ToolbarGroup>
          <Avatar className={css(styles.avatar)}>
          {
            this.props.userStore.name ? this.props.userStore.name[0].toUpperCase() : 'U'
          }
          </Avatar>
          <ToolbarTitle text="Manage your groups" className={css(styles.headerTitle)} />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <RaisedButton
            label="Create new group"
            primary={true}
            onClick={() => {history.push('/newGroup')}} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default connect(store => ({ userStore: store.user }))(Header)
