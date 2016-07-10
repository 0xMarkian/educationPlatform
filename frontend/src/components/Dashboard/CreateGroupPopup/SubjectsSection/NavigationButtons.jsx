import { styles, muiStyles } from '../styles'

import React from 'react'
import { css } from 'aphrodite'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { FlatButton, RaisedButton, CircularProgress } from 'material-ui'

import { setGroupPopupStep } from 'actions/group'
import { sendChosenSubject } from 'actions/subjects'


class NavigationButtons extends React.Component {
  @autobind
  prevStep() {
    const { setGroupPopupStep } = this.props
    setGroupPopupStep(0)
  }

  @autobind
  nextStep() {
    const { sendChosenSubject, subjectsStore } = this.props,
          { requestMethod } = subjectsStore
    let { chosenSubject } = this.props
    if(!chosenSubject) chosenSubject = subjectsStore.data[0]
    sendChosenSubject(chosenSubject, requestMethod)
  }

  render() {
    const { isFetching } = this.props.subjectsStore

    return(
      <div>
        <FlatButton
          className={css(styles.backButton)}
          onClick={this.prevStep}
          label='Back'
        />
        <RaisedButton
          primary={true}
          onClick={this.nextStep}
          label='Next'
        />
        {isFetching ? (
          <CircularProgress size={muiStyles.progress.size}/>
        ) : (null)}
      </div>
    )
  }
}

export default connect( store => ({
  subjectsStore: store.subjects,
}), {
  setGroupPopupStep,
  sendChosenSubject,
})(NavigationButtons)
