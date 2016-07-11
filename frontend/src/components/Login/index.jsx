import { styles, muiStyles } from './styles'

import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Dialog, RaisedButton, Snackbar } from 'material-ui'
import { push } from 'react-router-redux'
import { css } from 'aphrodite'

import { userLogin, userLogout, removeLoginError } from 'actions/user'
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
    const { userStore, push } = this.props

    if(userStore.name) return push('/dashboard')
  }

  render() {
    const { userStore, removeLoginError } = this.props
    const { password, username } = this.state
    const submitButtonDisabled = !(password && username)

    return(
      <div>
        <Dialog
          title='Login in a second'
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
          <RaisedButton
            primary={true}
            label="Login"
            disabled={submitButtonDisabled}
            onTouchTap={this.handleLogin}
          />
          <p>Do not have an account yet? <Link to='/register'>Register now!</Link></p>
        </Dialog>
        <Snackbar
          open={!!userStore.loginError}
          autoHideDuration={muiStyles.snackbar.hideDuration}
          message={userStore.loginError || ''}
          onRequestClose={removeLoginError}
        />
      </div>
    )
  }
}

export default connect(store => ({ userStore: store.user }), {
  userLogin,
  userLogout,
  push,
  removeLoginError,
})(LoginSection)
