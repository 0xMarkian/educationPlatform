import React from 'react'
import autobind from 'autobind-decorator'

import InputSection from './InputSection'
import NavigationButtons from './NavigationButtons'


class GroupNameSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groupName: {
        value: null,
        error: null,
      },
    }
  }

  @autobind
  updateGroupNameInputData(value, error) {
    this.setState({
      groupName: { value, error, },
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
        />
      </div>
    )
  }
}


export default GroupNameSection
