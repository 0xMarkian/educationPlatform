import React from 'react'
import {connect} from 'react-redux'
import {FlatButton, RaisedButton, CircularProgress} from 'material-ui'

import {hideNewGroupPopup, setCurrentStep} from 'actions/newGroupPopup'


class ButtonsRow extends React.Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
  }

  prevStep() {
    const {setCurrentStep} = this.props
    setCurrentStep(1)
  }

  nextStep() {
    const {hideNewGroupPopup} = this.props
    hideNewGroupPopup()
  }

  render() {
    const {isFetching} = this.props.commonStore.subjects

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
  commonStore: store.common
}), {
  hideNewGroupPopup,
  setCurrentStep
})(ButtonsRow)