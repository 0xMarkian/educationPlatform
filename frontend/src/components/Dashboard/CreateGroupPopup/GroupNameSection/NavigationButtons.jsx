import { muiStyles } from '../styles'

import React from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { RaisedButton, CircularProgress } from 'material-ui'

import { createGroup } from 'actions/group'


class NavigationButtons extends React.Component {
  @autobind
  nextStep() {
    const {groupStore, createGroup, inputData} = this.props
    const groupName = inputData.value

    createGroup(groupName, groupStore.requestMethod)
  }

  render() {
    const { inputData, groupStore } = this.props
    const { isLoading } = groupStore
    const buttonDisabled = (!!inputData.error || isLoading)

    return(
      <div>
        <RaisedButton
          primary={true}
          disabled={buttonDisabled}
          onClick={this.nextStep}
          label='Next'
        />
        {isLoading ? (
          <CircularProgress size={muiStyles.progress.size}/>
        ) : (null)}
      </div>
    )
  }
}

export default connect( store => ({ groupStore: store.group }), { createGroup })(NavigationButtons)
