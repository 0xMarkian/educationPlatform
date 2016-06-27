import React from 'react'
import {connect} from 'react-redux'
import {Dialog} from 'material-ui'

import StepProgress from './StepProgress'
import GroupNameForm from './GroupNameForm'
import SubjectsForm from './SubjectsForm'
import StudentsForm from './StudentsForm'


class NewGroupPopup extends React.Component {
  constructor(props){
    super(props)
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
        {
          currentStep === 0 ? <GroupNameForm /> :
          currentStep === 1 ? <SubjectsForm /> :
          currentStep === 2 ? <StudentsForm /> :
          null
        }
      </Dialog>
    )
  }
}

export default connect( store => ({ popupStore: store.newGroupPopup }))(NewGroupPopup)
