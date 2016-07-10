import { styles } from './styles'

import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Dialog, RaisedButton } from 'material-ui'
import autobind from 'autobind-decorator'
import { css } from 'aphrodite'

import { userRegister } from 'actions/user'
import Username from './Username'
import Password from './Password'

class RegisterSection extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: null,
      password: null,
    }
  }

  @autobind
  updateUsernameState(username){
    this.setState({username})
  }

  @autobind
  updatePasswordState(password){
    this.setState({password})
  }

  @autobind
  handleLogin() {
    const { userRegister } = this.props
    const { username, password } = this.state

    userRegister(username, password)
  }

  render() {
    const { password, username } = this.state

    const submitButtonDisabled = !(password && username)
    return(
      <Dialog
        title='Sign up in a second'
        modal={true}
        open={true}
        titleClassName={css(styles.popupHeader)}
        autoScrollBodyContent={true}
      >
        <br/>
        <Username
          updateUsernameState={this.updateUsernameState}
        />
        <Password
          updatePasswordState={this.updatePasswordState}
        />
        <RaisedButton
          className={css(styles.registerButton)}
          label="Register me"
          primary={true}
          disabled={submitButtonDisabled}
          onClick={this.handleLogin}
        />
        <p>Already have an account? <Link to='/login'>Sign in</Link></p>
      </Dialog>
    )
  }
}

export default connect(store => ({ userStore: store.user }), { userRegister })(RegisterSection)
