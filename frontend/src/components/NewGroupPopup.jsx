import React from 'react'
import {connect} from 'react-redux'
import {Grid, Row, Cell} from 'react-inline-grid'
import Remove from 'material-ui/svg-icons/content/backspace'
import Person from 'material-ui/svg-icons/social/person'
import {Dialog, TextField, FlatButton, RaisedButton} from 'material-ui'
import {Step, Stepper, StepLabel, CircularProgress} from 'material-ui'
import {DropDownMenu, MenuItem, List, ListItem} from 'material-ui'


class NewGroupPopup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      finished: false,
      stepIndex: 0,
      groupNamePattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
      errorMessages: {
        invalidGroupName: 'Please use [ a-z A-Z 0-9 _ - ]'
      },
      subjects: null,
      students: null,
      studentToDelete: null,
      chosenSubject: null,
      loading: false
    }
  }

  nextStep() {
    const store = this.props.store
    const dispatch = this.props.dispatch
    const {stepIndex} = this.state

    this.setState({ loading: true })
    if(this.state.stepIndex === 0) {
      let requestMethod = null
      if(!store.groupId) requestMethod = 'POST'
      else requestMethod = 'PATCH' // User has entered group's name already and tries to change it
      fetch('http://localhost:8080/groups', {
        mode: 'cors',
        method: requestMethod,
        body: JSON.stringify({
          curatorId: store.curatorId,
          name: store.newGroupPopup.groupName.value
        })
      })
      .then(res => res.json())
      .then(res => {
        dispatch({ type: 'SET_GROUP_ID', id: res._id })
        this.setState({
          loading: false,
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 3
        })
      })
    } else if(this.state.stepIndex === 1) {
      fetch('http://localhost:8080/courses', {
        mode: 'cors',
        method: 'post',
        body: JSON.stringify({
          subject: this.state.chosenSubject._id,
          group: store.groupId
        })
      }).then(res => {
        dispatch({ type: 'SET_COURSE_ID', id: res._id })
        this.setState({
          loading: false,
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 3
        })
      })
    }
  }

  prevStep() {
    const {stepIndex} = this.state
    if(stepIndex > 0){
      this.setState({
        loading: false,
        stepIndex: stepIndex - 1
      })
    }
  }

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
  }

  handleSubjectChosing(event, index, value) {
    this.setState({ chosenSubject: this.state.subjects[index] })
  }

  handleNewStudentInput() {
    const newStudentNameInput = this.refs['new-group-modal-students']
    const newStudentNameInputValue = newStudentNameInput.input.value
    let finalStudentsArray = null
    console.log(newStudentNameInputValue)
    if(this.state.students){
      finalStudentsArray = [ ...this.state.students, newStudentNameInputValue]
    } else {
      finalStudentsArray = [newStudentNameInputValue]
    }
    this.setState({
      students: finalStudentsArray
    })
  }

  handleRemoveStudent(index) {
    this.setState({
      students: [ ...this.state.students.slice(0, index), ...this.state.students.slice(index+1) ]
    })
  }

  componentDidMount() {
    this.setState({ loading: true })
    fetch('http://localhost:8080/subjects', {
      mode: 'cors',
      method: 'GET'
    }).then(res => res.json()).then(res => {
      this.setState({
        subjects: res,
        chosenSubject: res[0],
        loading: false
      })
    })
  }

  render() {
    console.log(this.props.store)
    const store = this.props.store.newGroupPopup
    const {finished, stepIndex, loading} = this.state;
    const nextStepDisabled = (store.groupName.error || loading)

    return(
      <Dialog
        title='Create a new group'
        modal={true}
        open={store.popupOpen}
        titleClassName='new-group-modal-title'
        onRequestClose={this.handleClose}
      >
        <Grid>
          <Row is='start nospace'>
            <Cell is='12 nospace'>
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
            </Cell>
          </Row>
        </Grid>
        <br/>
        {this.state.stepIndex === 0 ? (
          <Grid>
            <Row is='start nospace'>
              <Cell is='12 nospace'>
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
              </Cell>
            </Row>
          </Grid>
        ) : (null)}
        {this.state.stepIndex === 1 ? (
          <Grid>
            <Row is='start nospace'>
              <Cell is='12 no-space'>
                <label htmlFor='new-group-subject'>Pick a subject:</label><br/>
                <DropDownMenu
                  maxHeight={300}
                  value={this.state.chosenSubject ? this.state.chosenSubject._id : this.state.subjects[0]._id}
                  onChange={this.handleSubjectChosing}
                >
                  {
                    this.state.subjects.map((value, index) => {
                      return (<MenuItem
                        value={value._id}
                        primaryText={value.name}
                        key={index}
                        listStyle={{ margin: 0, padding: 0 }}
                      ></MenuItem>)
                    })
                  }
                </DropDownMenu>
              </Cell>
            </Row>
          </Grid>
        ) : (null)}
        {this.state.stepIndex === 2 ? (
          <Grid>
            <div>
            <Row is='start nospace'>
              <Cell is='middle 5 nospace'>
                <TextField
                  ref='new-group-modal-students'
                  id='new-group-modal-students'
                  hintText='Student name'
                  type='text'
                />
              </Cell>
              <Cell is='middle 4 nospace'>
                <RaisedButton
                  label={'ADD'}
                  primary={true}
                  disabled={nextStepDisabled}
                  onTouchTap={this.handleNewStudentInput}
                />
              </Cell>
            </Row>
            <Row is='start nospace'>
              <Cell is='middle 12 nospace'>
                <List style={{maxHeight: 200, overflowY: 'auto'}}>
                  {this.state.students ? this.state.students.map((value, index) => (
                    <ListItem
                      key={index}
                      primaryText={value}
                      rightIcon={<Remove />}
                      onTouchTap={() => {this.handleRemoveStudent(index)}}
                    />
                  )) : (null)}
                </List>
              </Cell>
            </Row>
            </div>
          </Grid>
        ) : (null)}
        <br/><br/>
        <Grid>
          <Row is='start nospace'>
            <Cell is='middle 2 nospace'>
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                onTouchTap={this.prevStep}
                style={{marginRight: 12}}
              />
            </Cell>
            <Cell is='middle 2 nospace'>
              <RaisedButton
                label={stepIndex === 2 ? 'Finish' : 'Next'}
                primary={true}
                disabled={nextStepDisabled}
                onTouchTap={this.nextStep}
              />
            </Cell>
            <Cell is='middle 2 nospace'>
              <div>
                {loading ? (
                  <CircularProgress size={0.5}/>
                ) : (null)}
              </div>
            </Cell>
          </Row>
        </Grid>
      </Dialog>
    )
  }
}

export default connect( (store) => ({ store: store.workspace }))(NewGroupPopup)