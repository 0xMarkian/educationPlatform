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
          newGroupPopupStep === 0 ? <GroupNameSection /> :
          newGroupPopupStep === 1 ? <StudentsSection /> :
          newGroupPopupStep === 2 ? <SubjectsSection /> :
          null
        }
      </Dialog>
    )
  }
}


export default connect( store => ({ groupStore: store.group }) )(NewGroupPopup)
