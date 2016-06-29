import React from 'react'
import {connect} from 'react-redux'
import {FlatButton, RaisedButton, CircularProgress} from 'material-ui'

import {
  hideNewGroupPopup,
  fetchGroupName
} from 'actions/newGroupPopup'


class ButtonsRow extends React.Component {
  constructor(props) {
    super(props)
    this.prevStep = this.prevStep.bind(this)
    this.nextStep = this.nextStep.bind(this)
  }

  prevStep() {
    const {hideNewGroupPopup} = this.props
    hideNewGroupPopup()
  }

  nextStep() {
    const {fetchGroupName, groupStore, commonStore} = this.props,
          {fetchMethod, value} = groupStore.groupName,
          {curatorId} = commonStore
    fetchGroupName(fetchMethod, curatorId, value)
  }

  render() {
    const {groupName} = this.props.groupStore
    const {isFetching} = groupName

    return(
      <div>
        <FlatButton
          label='Back'
          style={{marginRight: 12}}
          onTouchTap={this.prevStep}
        />
        <RaisedButton
          primary={true}
          disabled={groupName.error || isFetching}
          onTouchTap={this.nextStep}
          label='Next'
        />
        {isFetching ? (
          <CircularProgress size={0.5}/>
        ) : (null)}
      </div>
    )
  }
}

export default connect( store => ({
  groupStore: store.newGroupPopup,
  commonStore: store.common
}), {
  hideNewGroupPopup,
  fetchGroupName
})(ButtonsRow)
