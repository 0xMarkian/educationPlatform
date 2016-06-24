import React from 'react'
import {Dialog, TextField, FlatButton, RaisedButton, Step, Stepper, StepLabel} from 'material-ui'

if(module.hot){ module.hot.accept() }

const NewGroupPopup = React.createClass({
  getInitialState() {
    return {
      finished: false,
      stepIndex: 0,
      groupNamePattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
      errorMessages: {
        invalidGroupName: 'Please use [ a-z A-Z 0-9 _ - ]'
      }
    }
  },

  nextStep() {
    const store = this.props.store
    const dispatch = this.props.dispatch
    const {stepIndex} = this.state
    
    fetch('http://localhost:8080/groups', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        curatorId: store.curatorId,
        name: store.newGroupPopup.groupName.value,
      })
    }).then(() => {
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 3
      })
    })
  },

  prevStep() {
    const {stepIndex} = this.state
    if(stepIndex > 0){
      this.setState({
       stepIndex: stepIndex - 1
      })
    }
  },

  handleGroupNameInput(event) {
    const groupNameInput = event.target
    const groupNameInputValue = groupNameInput.value
    const groupNameValid = this.state.groupNamePattern.test(groupNameInputValue)

    const dispatch = this.props.dispatch

    dispatch({ type: 'GROUP_NAME_INPUT', value: groupNameInputValue })
    if(!groupNameInputValue) { // An empty string
      // Set a flag to disable the Register button but don't show any error
      dispatch({ type: 'SET_GROUP_NAME_ERROR', errorText: null })
      return
    }

    if(!groupNameValid) {
      dispatch({ type: 'SET_GROUP_NAME_ERROR', errorText: this.state.errorMessages.invalidGroupName })
    } else {
      dispatch({ type: 'REMOVE_GROUP_NAME_ERROR' })
    }

  },

  render() {
    const store = this.props.store.newGroupPopup
    const {finished, stepIndex} = this.state;
    const nextStepDisabled = (store.groupName.error)

    if(this.state.stepIndex === 1){
      console.log(1)
      fetch('http://localhost:8080/subjects', {
        mode: 'cors',
        method: 'GET'
      }).then(res => res.text()).then(res => {
        console.log(res)
      })
    }

    return(
      <Dialog
        title='Create a new group'
        modal={true}
        open={store.popupOpen}
        titleClassName='new-group-modal-title'
        onRequestClose={this.handleClose}
      >
        <Stepper activeStep={stepIndex}>
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
        <br/>
        {this.state.stepIndex === 0 ? (
          <div>
            <label htmlFor='new-group-modal-name'>Group name:</label><br/>
            <TextField
             defaultValue={store.groupName.value}
             errorText={store.groupName.errorText}
             ref='new-group-modal-name'
             id='new-group-modal-name'
             hintText='Group name'
             type='text'
             onChange={this.handleGroupNameInput}
            /><br/><br/>
          </div>
        ) : (null)}
        {this.state.stepIndex === 1 ? (
          <div>
            <label htmlFor='new-group-subject'></label><br/>
            
          </div>
        ) : (null)}
        <FlatButton
          label="Back"
          disabled={stepIndex === 0}
          onTouchTap={this.prevStep}
          style={{marginRight: 12}}
        />
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          primary={true}
          disabled={nextStepDisabled}
          onTouchTap={this.nextStep}
        />
      </Dialog>
    )
  }
})

export default NewGroupPopup