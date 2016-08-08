import { styles, muiStyles } from '../styles'

import React, { Component} from 'react'
import { connect } from 'react-redux'
import { css } from 'aphrodite'
import autobind from 'autobind-decorator'
import { RaisedButton, CircularProgress } from 'material-ui'

import { createGroup, updateGroup } from 'actions/group'


class NavigationButtons extends Component {
  @autobind
  nextStep() {
    const { groupId, createGroup, updateGroup, inputData } = this.props
    const groupName = inputData.value


    if(groupId) return updateGroup(groupId, { name: groupName })
    createGroup({ name: groupName})
  }

  render() {
    const { inputData, groupLoading } = this.props
    const buttonDisabled = inputData.error || !inputData.value || groupLoading

    return(
      <div className={css(styles.navigationButtons)}>
        <RaisedButton
          primary={true}
          disabled={buttonDisabled}
          onTouchTap={this.nextStep}
          label='Next'
        />
        { groupLoading ? <CircularProgress size={muiStyles.progress.size}/> : null }
      </div>
    )
  }
}

export default connect( store => {
  const { _id: groupId } = store.group.data
  const { isLoading: groupLoading } = store.group

  return { groupId, groupLoading }
}, { createGroup, updateGroup })(NavigationButtons)
