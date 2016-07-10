import React from 'react'
import autobind from 'autobind-decorator'

import InputSection from './InputSection'
import NavigationButtons from './NavigationButtons'


class GroupNameInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groupName: {
        value: null,
        error: true,
        errorText: null,
      },
    }
  }

  @autobind
  updateGroupNameInputData(value, error, errorText) {
    this.setState({
      groupName: {
        value, error, errorText
      },
    })
  }

  render() {
    const inputData = this.state.groupName

    return(
      <div>
        <InputSection
          inputData={inputData}
          updateGroupNameInputData={this.updateGroupNameInputData}
        />
        <NavigationButtons
          inputData={inputData}
          handleClose={this.props.handleClose}
        />
      </div>
    )
  }
}


export default GroupNameInput
