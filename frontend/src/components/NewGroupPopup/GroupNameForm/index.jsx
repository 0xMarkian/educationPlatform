import React from 'react'
import {connect} from 'react-redux'

import InputRow from './InputRow'
import ButtonsRow from './ButtonsRow'


class GroupNameInput extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div>
        <InputRow />
        <ButtonsRow />
      </div>
    )
  }
}


export default connect(store => ({ store }))(GroupNameInput)