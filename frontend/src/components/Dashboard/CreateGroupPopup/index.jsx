import React from 'react'
import {connect} from 'react-redux'
import {Dialog} from 'material-ui'
import autobind from 'autobind-decorator'

import history from 'appHistory'
import StepProgress from './StepProgress'
import GroupNameSection from './GroupNameSection'
import SubjectsSection from './SubjectsSection'
import StudentsSection from './StudentsSection'


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
  }

  @autobind
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
          newGroupPopupStep === 0 ? <GroupNameSection
            handleClose={this.handleClose}
            inputData={this.state.groupName.input}
            updateGroupNameInputData={this.updateGroupNameInputData}
          /> :
          newGroupPopupStep === 1 ? <SubjectsSection /> :
          newGroupPopupStep === 2 ? <StudentsSection /> :
          null
        }
      </Dialog>
    )
  }
}


export default connect( store => ({ groupStore: store.group }) )(NewGroupPopup)
