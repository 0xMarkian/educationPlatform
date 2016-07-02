import React from 'react'
import {connect} from 'react-redux'
import {TextField} from 'material-ui'


class InputRow extends React.Component {
  constructor(props) {
    super(props)
    this.groupNamePattern = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/
    this.invalidGroupNameError = 'Please use [ a-z A-Z 0-9 _ - ]'
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(event) {
    const inputValue = event.target.value
    const {groupNamePattern, errorMessages} = this
    const {updateGroupNameInputData} = this.props

    if(!inputValue){
      updateGroupNameInputData(inputValue, true, null)
      return
    }
    if(!groupNamePattern.test(inputValue))
      updateGroupNameInputData(inputValue, true, errorMessages.invalidGroupName)
    else updateGroupNameInputData(inputValue, false, null)
  }

  render() {
    const {inputData} = this.props

    return(
      <div>
        <label htmlFor='new-group-modal-name'>Group name:</label><br/>
        <TextField
          defaultValue={inputData.value}
          errorText={inputData.errorText}
          ref='new-group-modal-name'
          id='new-group-modal-name'
          hintText='Group name'
          type='text'
          onChange={this.handleInput}
        /><br/><br/>
      </div>
    )
  }
}

export default connect()(InputRow)
