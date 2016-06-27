import React from 'react'
import {connect} from 'react-redux'
import {TextField} from 'material-ui'

import {
  groupNameInput,
  setGroupNameError,
  removeGroupNameError
} from 'actions/newGroupPopup'


class InputRow extends React.Component {
  constructor(props) {
    super(props)
    this.staticData = {
      groupNamePattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
      errorMessages: {
        invalidGroupName: 'Please use [ a-z A-Z 0-9 _ - ]'
      }
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(event) {
    const inputValue = event.target.value
    const {groupNamePattern, errorMessages} = this.staticData
    const {groupNameInput, setGroupNameError, removeGroupNameError} = this.props

    groupNameInput(inputValue)

    if(!inputValue) setGroupNameError(null)
    if(!groupNamePattern.test(inputValue)) setGroupNameError(errorMessages.invalidGroupName)
    else removeGroupNameError()
  }

  render() {
    const {groupStore} = this.props

    return(
      <div>
        <label htmlFor='new-group-modal-name'>Group name:</label><br/>
        <TextField
          defaultValue={groupStore.groupName.value}
          errorText={groupStore.groupName.errorText}
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

export default connect( store => ({ groupStore: store.newGroupPopup }), {
  groupNameInput,
  setGroupNameError,
  removeGroupNameError
})(InputRow)