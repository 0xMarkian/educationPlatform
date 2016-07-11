import { muiStyles, styles } from '../styles'

import React from 'react'
import { connect } from 'react-redux'
import { css } from 'aphrodite'
import autobind from 'autobind-decorator'
import { FlatButton, RaisedButton, CircularProgress } from 'material-ui'

import { setGroupPopupStep } from 'actions/group'

class NavigationButtons extends React.Component {
  @autobind
  prevStep() {
    const { setGroupPopupStep } = this.props
    setGroupPopupStep(1)
  }

  @autobind
  nextStep() {
    const { setGroupPopupStep } = this.props

    setGroupPopupStep(2)
  }

  render() {
    const { isFetching } = false

    return(
      <div className={css(styles.navigationButtons)}>
        <FlatButton
          className={css(styles.backButton)}
          onTouchTap={this.prevStep}
          label='Back'
        />
        <RaisedButton
          primary={true}
          onTouchTap={this.nextStep}
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
  groupStore: store.newGroupPopup,
}), {
  setGroupPopupStep
})(NavigationButtons)
