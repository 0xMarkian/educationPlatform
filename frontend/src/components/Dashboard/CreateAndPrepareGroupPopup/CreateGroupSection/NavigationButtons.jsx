import { styles, muiStyles } from '../styles'

import React from 'react'
import { connect } from 'react-redux'
import { css } from 'aphrodite'
import autobind from 'autobind-decorator'
import { RaisedButton, CircularProgress } from 'material-ui'

import { createGroup, patchGroupName } from 'actions/group'


class NavigationButtons extends React.Component {
  @autobind
  nextStep() {
    const { groupStore, createGroup, patchGroupName, inputData } = this.props
    const groupName = inputData.value,
          { groupId } = groupStore
    if(groupId) patchGroupName(groupId, groupName)
    else createGroup(groupName)
  }

  render() {
    const { inputData, groupStore } = this.props
    const { isLoading } = groupStore
    const buttonDisabled = !!inputData.error || !inputData.value || isLoading

    return(
      <div className={css(styles.navigationButtons)}>
        <RaisedButton
          primary={true}
          disabled={buttonDisabled}
          onTouchTap={this.nextStep}
          label='Next'
        />
        { isLoading ? <CircularProgress size={muiStyles.progress.size}/> : null }
      </div>
    )
  }
}

export default connect( store => ({ groupStore: store.group }), { createGroup, patchGroupName })(NavigationButtons)
