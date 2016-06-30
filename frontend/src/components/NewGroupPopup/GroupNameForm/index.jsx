import React from 'react'
import {connect} from 'react-redux'

import InputRow from './InputRow'
import ButtonsRow from './ButtonsRow'


class GroupNameInput extends React.Component {
  render() {
    return(
      <div>
        <InputRow
          inputData={this.props.inputData}
          updateGroupNameInputData={this.props.updateGroupNameInputData}
        />
        <ButtonsRow
          inputData={this.props.inputData}
          handleClose={this.props.handleClose}
        />
      </div>
    )
  }
}


export default connect(store => ({ store }))(GroupNameInput)
