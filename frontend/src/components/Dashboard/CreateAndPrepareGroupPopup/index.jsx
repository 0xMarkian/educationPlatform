import React from 'react'
import {connect} from 'react-redux'
import {Dialog} from 'material-ui'
import autobind from 'autobind-decorator'

import history from 'appHistory'
import StepProgress from './StepProgress'
import GroupNameSection from './CreateGroupSection'
import SubjectsSection from './CourseSection'
import StudentsSection from './StudentsSection'


class CreateAndPrepareGroupPopup extends React.Component {
  @autobind
  handleClose() {
    history.push('/dashboard')
  }

  render() {
    const { navigationStep } = this.props

    return(
      <Dialog
        title='Create a new group'
        modal={true}
        open={true}
        autoScrollBodyContent={true}
        titleClassName='new-group-modal-title'
        onRequestClose={this.handleClose}
      >
        <StepProgress step={navigationStep} />
        {
          navigationStep === 0 ? <GroupNameSection /> :
          navigationStep === 1 ? <StudentsSection /> :
          navigationStep === 2 ? <SubjectsSection /> :
          null
        }
      </Dialog>
    )
  }
}


export default connect( store => ({ navigationStep: store.group.createAndPrepareGroupPopupStep }) )(CreateAndPrepareGroupPopup)
