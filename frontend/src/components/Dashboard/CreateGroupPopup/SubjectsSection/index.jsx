import React from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'

import InputSection from './InputSection'
import NavigationButtons from './NavigationButtons'


class SubjectsSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenSubject: null,
    }
  }

  @autobind
  setChosenSubject(subject) {
    this.setState({
      chosenSubject: subject
    })
  }

  render() {
    const { chosenSubject } = this.state

    return(
      <div>
        <InputSection
          chosenSubject={chosenSubject}
          setChosenSubject={this.setChosenSubject}
        />
        <br/><br/>
        <NavigationButtons chosenSubject={chosenSubject} />
      </div>
    )
  }
}

export default connect( store => ({ groupStore: store.group }))(SubjectsSection)
