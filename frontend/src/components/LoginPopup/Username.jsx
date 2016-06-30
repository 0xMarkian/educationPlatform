import React from 'react'
import {connect} from 'react-redux'
import {TextField} from 'material-ui'


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
    const inputValue = event.target.value
    const {updateInputData} = this.props
    const {usernamePattern, errorMessages} = this.staticData

    updateInputData('username', inputValue, false, null)

    if(!inputValue){
      updateInputData('username', inputValue, true, null)
      return
    }
    if(!usernamePattern.test(inputValue)) updateInputData('username', inputValue, true, errorMessages.invalidUsername)
    else updateInputData('username', inputValue, false, null)
  }

  render() {
    const {inputsData} = this.props

    return(
      <div>
        <label htmlFor='login-modal-username'>Username:</label><br/>
        <TextField
          errorText={inputsData.username.errorText}
          id='login-modal-username'
          hintText='username'
          type='text'
          onChange={this.handleInput}
        /><br/><br/>
      </div>
    )
  }
}

export default connect()(Username)
