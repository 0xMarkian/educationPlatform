import React from 'react'
import {connect} from 'react-redux'
import {TextField} from 'material-ui'

import {
  fieldInput,
  setFieldError,
  removeFieldError
} from '../../actions/login'

class RetypedPassword extends React.Component {
  constructor(props) {
    super(props)
    this.staticData = {
      errorMessages: {
        differentPasswords: 'Passwords do not match'
      }
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(event) {
    const {store, fieldInput, setFieldError, removeFieldError} = this.props
    const {errorMessages} = this.staticData
    const retypedPasswordInputValue = event.target.value

    fieldInput({ name: 'retypedPassword', value: retypedPasswordInputValue })

    if(!retypedPasswordInputValue){
      setFieldError({ name: 'retypedPassword', errorText: null })
      return
    }
    if(store.password.value === retypedPasswordInputValue) removeFieldError({ name: 'retypedPassword' })
    else setFieldError({ name: 'retypedPassword', errorText: errorMessages.differentPasswords })
  }

  render() {
    const {store} = this.props
    return(
      <div>
        <label htmlFor='login-modal-retyped-password'>Retype password:</label><br/>
        <TextField
          errorText={store.retypedPassword.errorText}
          id='login-modal-retyped-password'
          hintText='Retype password'
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
})(RetypedPassword)