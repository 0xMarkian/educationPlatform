import React from 'react'
import {connect} from 'react-redux'
import {TextField} from 'material-ui'


class Password extends React.Component {
  constructor(props) {
    super(props)
    this.staticData = {
      passwordMinLength: 8,
      errorMessages: {
        shortPassword: 'It must contain at least 8 characters',
      }
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(event) {
    const {inputsData, updateInputData, differentPasswordsError} = this.props
    const {passwordMinLength, errorMessages} = this.staticData
    const inputValue = event.target.value

    if(!inputValue){
      updateInputData('password', inputValue, true, null)
      return
    }

    if(inputValue.length >= passwordMinLength) updateInputData('password', inputValue, false, null)
    else updateInputData('password', inputValue, true, errorMessages.shortPassword)

    if(inputValue !== inputsData.retypedPassword.value) { // Passwords don't match...
      if(inputsData.retypedPassword.value) { // ... and retyped password is not empty
        updateInputData('retypedPassword', undefined, true, differentPasswordsError)
      }
    }
    else updateInputData('retypedPassword', undefined, false, null)
}
  render() {
    const {inputsData} = this.props

    return(
      <div>
        <label htmlFor='login-modal-password'>Password:</label><br/>
        <TextField
          errorText={inputsData.password.errorText}
          id='login-modal-password'
          hintText='password'
          type='password'
          onChange={this.handleInput}
        /><br/><br/>
      </div>
    )
  }
}

export default connect()(Password)
