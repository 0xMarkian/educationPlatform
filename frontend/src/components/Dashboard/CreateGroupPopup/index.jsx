import React from 'react'
import {connect} from 'react-redux'
import {Dialog} from 'material-ui'

import {closeNewGroupPopup} from 'actions/group'
import StepProgress from './StepProgress'
import GroupNameForm from './GroupNameForm'
import SubjectsForm from './SubjectsForm'
import StudentsForm from './StudentsForm'


class NewGroupPopup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentStep: 0,
      groupName: {
        input: {
          value: null,
          error: true,
          errorText: null,
        }
      }
    }
    this.handleClose = this.handleClose.bind(this)
    this.updateGroupNameInputData = this.updateGroupNameInputData.bind(this)
  }

  updateGroupNameInputData(value, error, errorText) {
    this.setState({
      ...this.state,
      groupName: {
        ...this.state.groupName,
        input:{ value, error, errorText }
      }
    })
  }

  handleClose() {
    const {closeNewGroupPopup} = this.props
    closeNewGroupPopup()
  }

  render() {
    const {newGroupPopupOpen} = this.props.groupStore
    const {currentStep} = this.state

    return(
      <Dialog
        title='Create a new group'
        modal={true}
        open={true/*newGroupPopupOpen*/}
        titleClassName='new-group-modal-title'
        onRequestClose={this.handleClose}
      >
        <StepProgress />
        {
          currentStep === 0 ? <GroupNameForm
            handleClose={this.handleClose}
            inputData={this.state.groupName.input}
            updateGroupNameInputData={this.updateGroupNameInputData}
          /> :
          currentStep === 1 ? <SubjectsForm /> :
          currentStep === 2 ? <StudentsForm /> :
          null
        }
      </Dialog>
    )
  }
}


export default connect( store => ({ groupStore: store.group }), { closeNewGroupPopup })(NewGroupPopup)
