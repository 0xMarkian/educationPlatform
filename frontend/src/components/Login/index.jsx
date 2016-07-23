import { styles, muiStyles } from './styles'

import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Dialog, RaisedButton, Snackbar, CircularProgress } from 'material-ui'
import { push } from 'react-router-redux'
import { css } from 'aphrodite'

import { userLogin, removeLoginError } from 'actions/user'
import { startPage } from '../../utils'
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

    if(!password || !username) return
    userLogin(username, password)
  }

  componentDidUpdate() {
    const { userStore, push } = this.props

    if(userStore.data) push(startPage)
  }

  getSubmitButton(){
    const { loading } = this.props.userStore
    return loading ? <CircularProgress/> : <RaisedButton
        primary={true}
        label="Login"
        onTouchTap={this.handleLogin}
      />
  }
  render() {
    const { userStore, removeLoginError } = this.props,
      { loading } = userStore

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
          {this.getSubmitButton()}
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
  push,
  removeLoginError,
})(LoginSection)
