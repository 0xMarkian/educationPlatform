import React from 'react'
import {connect} from 'react-redux'

import InputRow from './InputRow'
import ButtonsRow from './ButtonsRow'


class SubjectsForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <InputRow />
        <br/>
        <ButtonsRow />
      </div>
    )
  }
}

export default connect()(SubjectsForm)
