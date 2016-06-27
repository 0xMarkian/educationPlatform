import React from 'react'
import {connect} from 'react-redux'
import Remove from 'material-ui/svg-icons/content/backspace'
import Person from 'material-ui/svg-icons/social/person'
import {Dialog, TextField, FlatButton, RaisedButton} from 'material-ui'
import {Step, Stepper, StepLabel, CircularProgress} from 'material-ui'
import {DropDownMenu, MenuItem, List, ListItem} from 'material-ui'

import StepProgress from './StepProgress'
import GroupNameForm from './GroupNameForm'
import SubjectsForm from './SubjectsForm'
import StudentsForm from './StudentsForm'


class NewGroupPopup extends React.Component {
  constructor(props){
    super(props)
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
    const {popupOpen, currentStep} = this.props.popupStore

    return(
      <Dialog
        title='Create a new group'
        modal={true}
        open={popupOpen}
        titleClassName='new-group-modal-title'
        onRequestClose={this.handleClose}
      >
        <StepProgress />
        <br/>
        {currentStep === 0 ? (
          <GroupNameForm />
        ) : (null)}
        {currentStep === 1 ? (
          <SubjectsForm />
        ) : (null)}
        {currentStep === 2 ? (
          <StudentsForm />
        ) : (null)}
      </Dialog>
    )
  }
}

export default connect( store => ({ popupStore: store.newGroupPopup }))(NewGroupPopup)
