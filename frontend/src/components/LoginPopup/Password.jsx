import React from 'react'
import {connect} from 'react-redux'
import {TextField} from 'material-ui'

import {
  fieldInput,
  setFieldError,
  removeFieldError
} from '../../actions/user'

class Password extends React.Component {
  constructor(props) {
    super(props)
    this.staticData = {
      passwordMinLength: 8,
      errorMessages: {
        shortPassword: 'It must contain at least 8 characters',
        differentPasswords: 'Passwords do not match'
      }
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(event) {
    const {store, fieldInput, setFieldError, removeFieldError} = this.props
    const {passwordMinLength, errorMessages} = this.staticData
    const passwordInputValue = event.target.value

    fieldInput({ name: 'password', value: passwordInputValue })

    if(!passwordInputValue){
      setFieldError({ name: 'password', errorText: null })
      return
    }
    if(passwordInputValue.length >= passwordMinLength) removeFieldError({ name: 'password' })
    else setFieldError({ name: 'password', errorText: errorMessages.shortPassword })
    if(passwordInputValue !== store.retypedPassword.value) { // Passwords don't match...
      if(store.retypedPassword.value) { // ... and retyped password is not empty
        setFieldError({ name: 'retypedPassword', errorText: errorMessages.differentPasswords })
      }
    } else removeFieldError({ name: 'retypedPassword' })
  }

  render() {
    const {store} = this.props

    return(
      <div>
        <label htmlFor='login-modal-password'>Password:</label><br/>
        <TextField
          errorText={store.password.errorText}
          id='login-modal-password'
          hintText='password'
          type='password'
          onChange={this.handleInput}
        /><br/><br/>
      </div>
    )
  }
}

export default connect( (store) => ({ store: store.login }), {
  fieldInput,
  setFieldError,
  removeFieldError
})(Password)
