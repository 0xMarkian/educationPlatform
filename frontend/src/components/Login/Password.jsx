import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { TextField } from 'material-ui'


class Password extends React.Component {
  constructor(props) {
    super(props)

    this.passwordMinLength =  4
    this.errorMessages = {
      short: `It must contain at least ${this.passwordMinLength} characters`,
      empty: 'The password field can\'t be empty',
    }

    this.state = {
      value: null,
      errorText: null,
    }
  }

  @autobind
  handleInput(e) {
    const { errorMessages, passwordMinLength, props } = this
    const { updatePasswordState } = props
    const password = e.target.value

    if(!password) return this.setState({ errorText: errorMessages.empty })
    if(password.length < passwordMinLength) return this.setState({ errorText: errorMessages.short} )

    this.setState({ errorText: null })
    updatePasswordState(password)
  }

  @autobind
  enableEditMode(){
    this.setState({
      errorText: null,
    })
  }
  render() {
    const { errorText } = this.state

    return(
      <div>
        <label htmlFor='login-modal-password'>Password:</label><br/>
        <TextField
          onFocus={this.enableEditMode}
          onBlur={this.handleInput}
          errorText={errorText}
          id='login-modal-password'
          hintText='password'
          type='password'
        /><br/><br/>
      </div>
    )
  }
}

export default Password
