import React from 'react'
import {connect} from 'react-redux'
import {Dialog} from 'material-ui'

import history from 'appHistory'
import StepProgress from './StepProgress'
import GroupNameForm from './GroupNameForm'
import SubjectsForm from './SubjectsForm'
import StudentsForm from './StudentsForm'


class NewGroupPopup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      groupName: {
        input: {
          value: null,
          error: true,
          errorText: null,
        },
      },
    }
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    history.push('/dashboard')
  }

  render() {
    const { newGroupPopupStep } = this.props.groupStore

    return(
      <Dialog
        title='Create a new group'
        modal={true}
        open={true}
        titleClassName='new-group-modal-title'
        onRequestClose={this.handleClose}
      >
        <StepProgress step={newGroupPopupStep} />
        {
          newGroupPopupStep === 0 ? <GroupNameForm
            handleClose={this.handleClose}
            inputData={this.state.groupName.input}
            updateGroupNameInputData={this.updateGroupNameInputData}
          /> :
          newGroupPopupStep === 1 ? <SubjectsForm /> :
          newGroupPopupStep === 2 ? <StudentsForm /> :
          null
        }
      </Dialog>
    )
  }
}


export default connect( store => ({ groupStore: store.group }) )(NewGroupPopup)