import { styles, muiStyles } from '../styles'

import React from 'react'
import { css } from 'aphrodite'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { FlatButton, RaisedButton, CircularProgress } from 'material-ui'
import { push } from 'react-router-redux'

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
    const { push } = this.props
    console.log('pushing')
    push('dashboard')
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
  push,
  setGroupPopupStep,
  sendChosenSubject,
})(NavigationButtons)
