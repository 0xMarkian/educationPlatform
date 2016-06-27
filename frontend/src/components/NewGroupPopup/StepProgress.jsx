import React from 'react'
import {connect} from 'react-redux'
import {Step, Stepper, StepLabel} from 'material-ui'


class StepProgress extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {currentStep} = this.props.popupStore

    return(
      <Stepper activeStep={currentStep}>
        <Step>
          <StepLabel>Enter a group name</StepLabel>
        </Step>
        <Step>
          <StepLabel>Pick a subject</StepLabel>
        </Step>
        <Step>
          <StepLabel>{'Enter students\' names'}</StepLabel>
        </Step>
      </Stepper>
    )
  }
}

export default connect( store => ({ popupStore: store.newGroupPopup }))(StepProgress)