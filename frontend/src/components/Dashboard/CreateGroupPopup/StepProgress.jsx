import React from 'react'
import { Step, Stepper, StepLabel } from 'material-ui'


class StepProgress extends React.Component {
  render() {
    const {step} = this.props

    return(
      <Stepper activeStep={step}>
        <Step>
          <StepLabel>Enter a group name</StepLabel>
        </Step>
        <Step>
          <StepLabel>{'Enter students\' names'}</StepLabel>
        </Step>
        <Step>
          <StepLabel>Pick some subjects</StepLabel>
        </Step>
      </Stepper>
    )
  }
}

export default StepProgress
