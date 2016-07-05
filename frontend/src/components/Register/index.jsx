import React from 'react'
import { connect } from 'react-redux'
import { Dialog, RaisedButton } from 'material-ui'

import Username from './Username'
import Password from './Password'
import RetypedPassword from './RetypedPassword'

class SignInPopup extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      inputsData: {
        username: { error: true, errorText: null, value: null },
        password: { error: true, errorText: null, value: null },
        retypedPassword: { error: true, errorText: null, value: null }
      }
    }
    this.staticData = {
      messages: {
        differentPasswords: 'Passwords do not match'
      }
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.updateInputData = this.updateInputData.bind(this)
  }

  updateInputData(input, value, error, errorText) {
    if(!input) return

    value = value === undefined ? this.state.inputsData[input].value : value
    error = error === undefined ? this.state.inputsData[input].error : error
    errorText = errorText === undefined ? this.state.inputsData[input].errorText : errorText

    this.setState({
      ...this.state,
      inputsData: {
        ...this.state.inputsData,
        [input]: {
          value, error, errorText
        }
      }
    })
  }

  handleLogin() {
    this.setState({ popupOpen: false })
  }

  render() {
    const {inputsData} = this.state
    const {store} = this.props
    const buttonEnabled = (!this.state.inputsData.username.error &&      // If none of the inputs
                           !this.state.inputsData.password.error &&      // is filed in a wrong way,
                           !this.state.inputsData.retypedPassword.error) // the button will not be disabled

    return(
      <Dialog
        title='Sign up in a second'
        modal={false}
        open={/*this.state.popupOpen*/false}
        titleClassName='login-modal-title'
        contentStyle={{ width: '40%' }}
      >
        <Username
          updateInputData={this.updateInputData}
          inputsData={inputsData}
        />
        <Password
          updateInputData={this.updateInputData}
          inputsData={inputsData}
          differentPasswordsError={this.staticData.messages.differentPasswords}
        />
        <RetypedPassword
          updateInputData={this.updateInputData}
          inputsData={inputsData}
          differentPasswordsError={this.staticData.messages.differentPasswords}
        />
        <RaisedButton label="Register me" primary={true} disabled={!buttonEnabled} onClick={this.handleLogin} />
      </Dialog>
    )
  }
}

export default connect( (store) => ({ store: store.user }))(SignInPopup)
