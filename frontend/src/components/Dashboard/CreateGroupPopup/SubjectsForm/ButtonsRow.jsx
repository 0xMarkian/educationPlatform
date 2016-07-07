import { styles } from './styles'

import React from 'react'
import { css } from 'aphrodite'
import { connect } from 'react-redux'
import { FlatButton, RaisedButton, CircularProgress } from 'material-ui'

import {
  setGroupPopupStep,
  sendChosenSubject,
} from 'actions/group'


class ButtonsRow extends React.Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
  }

  prevStep() {
    const {setGroupPopupStep} = this.props
    setGroupPopupStep(0)
  }

  nextStep() {
    const {sendChosenSubject, groupStore} = this.props,
          { requestMethod } = groupStore.subjects
    let { chosenSubject } = this.props
    if(!chosenSubject) chosenSubject = groupStore.subjects.list[0]
    sendChosenSubject(chosenSubject, requestMethod)
  }

  render() {
    const {isFetching} = this.props.groupStore.subjects
    return(
      <div>
        <FlatButton
          className={css(styles.buttonMargin)}
          onClick={this.prevStep}
          label='Back'
        />
        <RaisedButton
          primary={true}
          onClick={this.nextStep}
          label='Next'
        />
        {isFetching ? (
          <CircularProgress size={0.5}/>
        ) : (null)}
      </div>
    )
  }
}

export default connect( store => ({
  groupStore: store.group,
}), {
  setGroupPopupStep,
  sendChosenSubject,
})(ButtonsRow)
