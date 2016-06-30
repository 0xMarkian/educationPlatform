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
    const {inputsData, utils, differentPasswordsError} = this.props
    const {passwordMinLength, errorMessages} = this.staticData
    const inputValue = event.target.value

    if(!inputValue){
      utils.setInputError('password', null)
      return
    }

    if(inputValue.length >= passwordMinLength) utils.removeInputError('password')
    else utils.setInputError('password', errorMessages.shortPassword)

    if(inputValue !== inputsData.retypedPassword.value) { // Passwords don't match...
      if(inputsData.retypedPassword.value) { // ... and retyped password is not empty
        setInputError('retypedPassword', differentPasswordsError)
      }
    }
    else utils.removeInputError('retypedPassword')
    setTimeout(()=>{utils.setInputValue('password', inputValue)}, 0)
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
