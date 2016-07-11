import React from 'react'
import {TextField} from 'material-ui'
import autobind from 'autobind-decorator'


class MainSection extends React.Component {
  constructor(props) {
    super(props)
    this.groupNamePattern = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/
    this.invalidGroupNameError = 'Please use [ a-z A-Z 0-9 _ - ]'
  }

  @autobind
  handleInput(event) {
    const inputValue = event.target.value
    const { groupNamePattern, invalidGroupNameError } = this
    const { updateGroupNameInputData } = this.props

    if(!inputValue) return updateGroupNameInputData(inputValue, null)
    if(!groupNamePattern.test(inputValue))return updateGroupNameInputData(inputValue, invalidGroupNameError)
    return updateGroupNameInputData(inputValue, null)
  }

  render() {
    const {inputData} = this.props

    return(
      <div>
        <label htmlFor='new-group-modal-name'>Group name:</label><br/>
        <TextField
          defaultValue={inputData.value}
          errorText={inputData.error}
          ref='new-group-modal-name'
          id='new-group-modal-name'
          hintText='Group name'
          type='text'
          onChange={this.handleInput}
        />
      </div>
    )
  }
}

export default MainSection
