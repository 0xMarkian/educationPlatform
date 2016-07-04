import React from 'react'
import {connect} from 'react-redux'
import {FlatButton, RaisedButton, CircularProgress} from 'material-ui'

import {closeNewGroupPopup, setGroupPopupStep} from 'actions/group'


class ButtonsRow extends React.Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
  }

  prevStep() {
    const {setGroupPopupStep} = this.props
    setGroupPopupStep(1)
  }

  nextStep() {
    const {closeNewGroupPopup} = this.props
    closeNewGroupPopup()
  }

  render() {
    const {isFetching} = false

    return(
      <div>
        <FlatButton
          style={{marginRight: 12}}
          onTouchTap={this.prevStep}
          label='Back'
        />
        <RaisedButton
          primary={true}
          onTouchTap={this.nextStep}
          label='Finish'
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
}), {
  closeNewGroupPopup,
  setGroupPopupStep
})(ButtonsRow)