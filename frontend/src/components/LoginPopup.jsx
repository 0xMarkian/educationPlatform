import React from 'react'
import {Dialog, TextField, RaisedButton} from 'material-ui'

if(module.hot){ module.hot.accept() }

const DBRequest = (validate, errorRate = 0.5) => {
  if(validate) {
    if(!!(Math.random() > errorRate)){
        return true
    } else {
      return false
    }
  }
}


const Popup = React.createClass({
  getInitialState() {
      return {
          popupOpen: true,
          usernamePattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
          errorMessages: {
            invalidUsername: 'Please use [ a-z A-Z 0-9 _ - ]',
            takenUsername: 'This one is already taken',
            shortPassword: 'It must contain at least 8 characters',
            differentPasswords: 'Passwords do not match'
          }
      };
  },

  handleUsernameInput(event) {
    const usernameInput = event.target
    const usernameInputValue = usernameInput.value
    const usernameValid = this.state.usernamePattern.test(usernameInputValue)

    const dispatch = this.props.dispatch

    dispatch({ type: 'USERNAME_INPUT', value: usernameInputValue })

    if(!usernameInputValue) { // An empty string
      // Set a flag to disable the Register button but don't show any error
      dispatch({ type: 'SET_USERNAME_ERROR', errorText: null })
      return
    }
    if(!usernameValid) {
      dispatch({ type: 'SET_USERNAME_ERROR', errorText: this.state.errorMessages.invalidUsername })
      return
    }

    if(DBRequest(true, 0.5)) { // A fake db request to check whether the login is free
      dispatch({ type: 'SET_USERNAME_ERROR', errorText: this.state.errorMessages.takenUsername })
    } else {
      dispatch({ type: 'REMOVE_USERNAME_ERROR' })
    }
  },

  handlePasswordInput(event) {
    const store = this.props.store
    const dispatch = this.props.dispatch

    const passwordInput = event.target
    const passwordInputValue = passwordInput.value
    const passwordLongEnough = (passwordInputValue.length >= 8) ? true : false


    dispatch({ type: 'PASSWORD_INPUT', value: passwordInputValue })

    if(!passwordInputValue) { // An empty string
      // Set a flag to disable the Register button but don't show any error
      dispatch({ type: 'SET_PASSWORD_ERROR', errorText: null })
    }
    if(passwordLongEnough) {
      dispatch({ type: 'REMOVE_PASSWORD_ERROR' })
    } else {
      dispatch({ type: 'SET_PASSWORD_ERROR', errorText: this.state.errorMessages.shortPassword })
    }
    if(passwordInputValue !== store.retypedPassword.value) { // Passwords don't match...
      if(store.retypedPassword.value) { // ... and retyped password is not empty
        dispatch({ type: 'SET_RETYPED_PASSWORD_ERROR', errorText: this.state.errorMessages.differentPasswords })
      }
    } else {
         dispatch({ type: 'REMOVE_RETYPED_PASSWORD_ERROR' })
    }
  },

  handleRetypedPasswordInput(event) {
    const store = this.props.store
    const dispatch = this.props.dispatch
    
    const retypedPasswordInput = event.target
    const retypedPasswordInputValue = retypedPasswordInput.value
    const passwordsMatch = (store.password.value === retypedPasswordInputValue)? true : false

    dispatch({ type: 'RETYPED_PASSWORD_INPUT', value: retypedPasswordInputValue })

    if(!retypedPasswordInputValue) { // An empty string
      // Set a flag to disable the Register button but don't show any error
      dispatch({ type: 'SET_RETYPED_PASSWORD_ERROR', errorText: null })
      return
    }
    if(passwordsMatch) {
      dispatch({ type: 'REMOVE_RETYPED_PASSWORD_ERROR' })
    } else {
      dispatch({ type: 'SET_RETYPED_PASSWORD_ERROR', errorText: this.state.errorMessages.differentPasswords })
    }
  },

  handleLogin() {
    if(DBRequest(true, 0.5)) {
      this.setState({ popupOpen: false })
    }
  },

  render() {
    const store = this.props.store

    const buttonDisabled = (store.username.error ||      // If none of the inputs
                            store.password.error ||      // is filed in a wrong way,
                            store.retypedPassword.error) // the button will not be disabled

    return(
      <Dialog
        title='Sign up in a second'
        modal={false}
        open={false/*this.state.popupOpen*/}
        titleClassName='login-modal-title'
        contentStyle={{ width: '40%' }}
        onRequestClose={this.handleClose}
      >
        <label htmlFor='login-modal-username'>Username:</label><br/>
        <TextField
          errorText={store.username.errorText}
          ref='login-modal-username'
          id='login-modal-username'
          hintText='username'
          type='text'
          onChange={this.handleUsernameInput}
        /><br/><br/>
        <label htmlFor='login-modal-password'>Password:</label><br/>
        <TextField
          errorText={store.password.errorText}
          ref='login-modal-password'
          id='login-modal-password'
          hintText='password'
          type='password'
          onChange={this.handlePasswordInput}
        /><br/><br/>
        <label htmlFor='login-modal-retyped-password'>Retype Password:</label><br/>
        <TextField
          errorText={store.retypedPassword.errorText}
          ref='login-modal-retyped-password'
          id='login-modal-retyped-password'
          hintText='password'
          type='password'
          onChange={this.handleRetypedPasswordInput}
        /><br /><br />
        <RaisedButton label="Register me" primary={true} disabled={buttonDisabled} onClick={this.handleLogin} />
      </Dialog>
    )
  }
})

export default Popup