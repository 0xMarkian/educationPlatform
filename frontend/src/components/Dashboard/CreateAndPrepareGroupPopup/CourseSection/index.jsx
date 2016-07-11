import React from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'

import InputSection from './MainSection'
import NavigationButtons from './NavigationButtons'


class SubjectsSection extends React.Component {
  render() {
    return(
      <div>
        <InputSection />
        <br/><br/>
        <NavigationButtons />
      </div>
    )
  }
}

export default connect( store => ({ groupStore: store.group }))(SubjectsSection)
