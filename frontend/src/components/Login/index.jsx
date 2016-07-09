import { styles } from './styles'

import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { Dialog, RaisedButton } from 'material-ui'
import { css } from 'aphrodite'

import history from 'appHistory'
import { userLogin } from 'actions/user'
import Username from './Username'
import Password from './Password'


class LoginSection extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: null,
      password: null,
    }
  }

  @autobind
  updateUsernameState(username){
    this.setState({ username })
  }

  @autobind
  updatePasswordState(password){
    this.setState({ password })
  }

  @autobind
  handleLogin() {
    const { userLogin } = this.props
    const { username, password } = this.state

    userLogin(username, password)
  }

  componentDidUpdate() {
    const { userStore } = this.props
    if(userStore.loggedIn) history.push('dashboard')
  }

  render() {
    const { password, username } = this.state
    const submitButtonDisabled = !(password && username)

    return(
      <Dialog
        title='Sign in in a second'
        modal={true}
        open={true}
        titleClassName={css(styles.popupHeader)}
        autoScrollBodyContent={true}
      >
        <Username
          updateUsernameState={this.updateUsernameState}
        />
        <Password
          updatePasswordState={this.updatePasswordState}
        />
        <RaisedButton label="Login" primary={true} disabled={submitButtonDisabled} onClick={this.handleLogin} />
      </Dialog>
    )
  }
}

export default connect(store => ({ userStore: store.user }), { userLogin })(LoginSection)
