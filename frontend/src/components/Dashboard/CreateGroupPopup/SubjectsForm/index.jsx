import React from 'react'
import { connect } from 'react-redux'

import InputRow from './InputRow'
import ButtonsRow from './ButtonsRow'


class SubjectsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenSubject: null,
    }
  }

  render() {
    const { chosenSubject } = this.state

    return(
      <div>
        <InputRow chosenSubject={chosenSubject} />
        <br/><br/>
        <ButtonsRow chosenSubject={chosenSubject} />
      </div>
    )
  }
}

export default connect( store => ({ groupStore: store.group }))(SubjectsForm)
