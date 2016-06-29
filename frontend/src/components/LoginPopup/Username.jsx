import React from 'react'
import {connect} from 'react-redux'
import {TextField} from 'material-ui'

import {
  fieldInput,
  setFieldError,
  removeFieldError
} from '../../actions/user'

class Username extends React.Component {
  constructor(props) {
    super(props)
    this.staticData = {
      usernamePattern: /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/,
      errorMessages: {
        invalidUsername: 'Please use [ a-z A-Z 0-9 _ - ]',
        takenUsername: 'This one is already taken'
      }
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(event) {
    const {fieldInput, setFieldError, removeFieldError} = this.props
    const {usernamePattern, errorMessages} = this.staticData
    const usernameInputValue = event.target.value

    fieldInput({ name: 'username', value: usernameInputValue })
    removeFieldError({ name: 'username' })

    if(!usernameInputValue){
      setFieldError({ name: 'username', errorText: null })
      return
    }
    if(!usernamePattern.test(usernameInputValue))
      setFieldError({ name: 'username', errorText: errorMessages.invalidUsername })
  }

  render() {
    const {store} = this.props

    return(
      <div>
        <label htmlFor='login-modal-username'>Username:</label><br/>
        <TextField
          errorText={store.username.errorText}
          id='login-modal-username'
          hintText='username'
          type='text'
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
})(Username)
