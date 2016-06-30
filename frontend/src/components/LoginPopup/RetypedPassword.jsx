import React from 'react'
import {connect} from 'react-redux'
import {TextField} from 'material-ui'


class RetypedPassword extends React.Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(event) {
    const {inputsData, utils, differentPasswordsError} = this.props
    const inputValue = event.target.value

    if(!inputValue){
      utils.setInputError('retypedPassword', null)
      return
    }
    if(inputsData.password.value === inputValue) utils.removeInputError('retypedPassword')
    else utils.setInputError('retypedPassword', differentPasswordsError)
  }

  render() {
    const {inputsData} = this.props

    return(
      <div>
        <label htmlFor='login-modal-retyped-password'>Retype password:</label><br/>
        <TextField
          errorText={inputsData.retypedPassword.errorText}
          id='login-modal-retyped-password'
          hintText='Retype password'
          type='password'
          onChange={this.handleInput}
        /><br/><br/>
      </div>
    )
  }
}

export default connect()(RetypedPassword)
