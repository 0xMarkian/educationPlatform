import { muiStyles, styles } from '../styles'

import React from 'react'
import { connect } from 'react-redux'
import { css } from 'aphrodite'
import autobind from 'autobind-decorator'
import { FlatButton, RaisedButton, CircularProgress } from 'material-ui'

import history from 'appHistory'
import { setGroupPopupStep } from 'actions/group'

class ButtonsRow extends React.Component {
  @autobind
  prevStep() {
    const { setGroupPopupStep } = this.props
    setGroupPopupStep(1)
  }

  @autobind
  nextStep() {
    history.push('/dashboard')
  }

  render() {
    const { isFetching } = false

    return(
      <div>
        <FlatButton
          className={css(styles.backButton)}
          onTouchTap={this.prevStep}
          label='Back'
        />
        <RaisedButton
          primary={true}
          onTouchTap={this.nextStep}
          label='Finish'
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
})(ButtonsRow)
