import React, { Component } from 'react'
import autobind from 'autobind-decorator'

import MainSection from './MainSection'
import NavigationButtons from './NavigationButtons'


class StudentsSection extends Component {
  render() {
    return(
      <div>
        <MainSection />
        <br/>
        <NavigationButtons />
      </div>
    )
  }
}

export default StudentsSection
