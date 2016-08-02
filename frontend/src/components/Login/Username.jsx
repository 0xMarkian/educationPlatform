import { styles } from './styles'

import React from 'react'
import autobind from 'autobind-decorator'
import { TextField } from 'material-ui'
import { css } from 'aphrodite'


class Username extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errorText: null,
    }

    this.usernamePattern = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/
    this.errorMessages = {
      empty: 'The username can\'t be empty',
      invalid: 'Please use [ a-z A-Z 0-9 _ - ]',
    }
  }

  @autobind
  handleInput(e) {
    const { updateUsernameState } = this.props
    const { errorMessages, usernamePattern} = this
    const username = e.target.value

    if(!username) return this.setState({ errorText: errorMessages.empty })
    if(!usernamePattern.test(username)) return this.setState({ errorText: errorMessages.invalid })

    this.setState({ errorText: null})
    updateUsernameState(username)
  }

  @autobind
  enableEditMode(){
    const { updateUsernameState, removeLoginErrors } = this.props
    this.setState({ errorText: null})
    removeLoginErrors()
    updateUsernameState(null)
  }

  render() {
    const { errorText} = this.state
    const { validatingError } = this.props
    const foregroundErrorText = errorText || validatingError

    return(
      <div className={css(styles.username)}>
        <label htmlFor='login-modal-username'>Username:</label><br/>
        <TextField
          errorText={foregroundErrorText}
          id='login-modal-username'
          hintText='username'
          type='text'
          onBlur={this.handleInput}
          onFocus={this.enableEditMode}
        /><br/><br/>
      </div>
    )
  }
}

export default Username
