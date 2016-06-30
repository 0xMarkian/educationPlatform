import React from 'react'
import { connect } from 'react-redux'
import { FlatButton, RaisedButton, CircularProgress } from 'material-ui'

import { createGroup } from 'actions/group'


class ButtonsRow extends React.Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
  }

  nextStep() {
    const {createGroup, inputData} = this.props
    const groupName = inputData.value

    createGroup(groupName)
  }

  render() {
    console.log(this.props)
    const {isLoading} = this.props.groupState
    const {inputData} = this.props

    return(
      <div>
        <FlatButton
          label='Back'
          style={{marginRight: 12}}
          onClick={this.props.handleClose}
        />
        <RaisedButton
          primary={true}
          disabled={inputData.error || isLoading}
          onClick={this.nextStep}
          label='Next'
        />
        {isLoading ? (
          <CircularProgress size={0.5}/>
        ) : (null)}
      </div>
    )
  }
}

export default connect( store => ({ groupState: store.group }), { createGroup })(ButtonsRow)
