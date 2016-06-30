import React from 'react'
import {connect} from 'react-redux'
import {Dialog, RaisedButton} from 'material-ui'

import Username from './Username'
import Password from './Password'
import RetypedPassword from './RetypedPassword'

class Popup extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      popupOpen: true,
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
    this.setInputValue = this.setInputValue.bind(this)
    this.setInputError = this.setInputError.bind(this)
    this.removeInputError = this.removeInputError.bind(this)
  }

  setInputValue(input, value) {
    this.setState({
      ...this.state,
      inputsData: {
        ...this.state.inputsData,
        [input]: {
          ...this.state.inputsData[input],
          value
        }
      }
    })
  }

  setInputError(input, errorText) {
    this.setState({
      ...this.state,
      inputsData: {
        ...this.state.inputsData,
        [input]: {
          ...this.state.inputsData[input],
          error: true,
          errorText
        }
      }
    })
  }

  removeInputError(input) {
    this.setState({
      ...this.state,
      inputsData: {
        ...this.state.inputsData,
        [input]: {
          ...this.state.inputsData[input],
          error: false,
          errorText: null
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
    const utils = {
      setInputValue: this.setInputValue,
      setInputError: this.setInputError,
      removeInputError: this.removeInputError
    }
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
          utils={utils}
          inputsData={inputsData}
        />
        <Password
          utils={utils}
          inputsData={inputsData}
          differentPasswordsError={this.staticData.messages.differentPasswords}
        />
        <RetypedPassword
          utils={utils}
          inputsData={inputsData}
          differentPasswordsError={this.staticData.messages.differentPasswords}
        />
        <RaisedButton label="Register me" primary={true} disabled={!buttonEnabled} onClick={this.handleLogin} />
      </Dialog>
    )
  }
}

export default connect( (store) => ({ store: store.user }))(Popup)
