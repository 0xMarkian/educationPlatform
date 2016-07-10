import { muiStyles } from '../styles'

import React from 'react'
import { connect } from 'react-redux'
import { RaisedButton, CircularProgress } from 'material-ui'

import { createGroup } from 'actions/group'


class ButtonsRow extends React.Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
  }

  nextStep() {
    const {groupStore, createGroup, inputData} = this.props
    const groupName = inputData.value

    createGroup(groupName, groupStore.requestMethod)
  }

  render() {
    const {isLoading} = this.props.groupStore
    const { inputData } = this.props

    return(
      <div>
        <RaisedButton
          primary={true}
          disabled={inputData.error || isLoading}
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

export default connect( store => ({ groupStore: store.group }), { createGroup })(ButtonsRow)
