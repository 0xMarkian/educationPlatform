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
    const { updateUnConfirmedPassword } = this.props
    const { errorMessages, passwordMinLength } = this

    const password = e.target.value

    if(!password) return this.setState({ errorText: errorMessages.empty })
    if(password.length < passwordMinLength) return this.setState({ errorText: errorMessages.short} )

    this.setState({ errorText: null })
    updateUnConfirmedPassword(password)
  }

  @autobind
  enableEditMode(){
    const { updateUnConfirmedPassword } = this.props

    this.setState({
      errorText: null,
    })
    updateUnConfirmedPassword(null)
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

class ConfirmePassword extends Component {
  constructor(props) {
    super(props)

    this.errorMessages = {
      noMatch: 'The passwords don\'t match'
    }

    this.state = {
      errorText: null,
    }
  }

  @autobind
  handleInput(e){
    const { updatePasswordState, unConfirmedPassword } = this.props
    const { errorMessages } = this

    const password = e.target.value
    if(!password || password !== unConfirmedPassword) return this.setState({ errorText: errorMessages.noMatch })

    this.setState({ errorText: null })
    updatePasswordState(password)
  }

  @autobind
  enableEditMode(){
    const { updatePasswordState } = this.props

    this.setState({
      errorText: null,
    })

    updatePasswordState(null)
  }

  render() {
    const { errorText } = this.state

    return(
      <div>
        <label htmlFor='login-modal-retyped-password'>Retype password:</label><br/>
        <TextField
          onFocus={this.enableEditMode}
          onBlur={this.handleInput}
          errorText={errorText}
          id='login-modal-retyped-password'
          hintText='Retype password'
          type='password'
        /><br/><br/>
      </div>
    )
  }
}

export default class PasswordSection extends Component {
  constructor(props){
    super(props)

    this.state = {
      unConfirmedPassword: null,
    }
  }

  @autobind
  updateUnConfirmedPassword(password){
    this.setState({
      unConfirmedPassword: password,
    })
  }
  render(){
    const { unConfirmedPassword } = this.state
    return (
      <div>
        <Password updateUnConfirmedPassword={this.updateUnConfirmedPassword} />
        <ConfirmePassword unConfirmedPassword={unConfirmedPassword} updatePasswordState={this.props.updatePasswordState}/>
      </div>
    )
  }
}
