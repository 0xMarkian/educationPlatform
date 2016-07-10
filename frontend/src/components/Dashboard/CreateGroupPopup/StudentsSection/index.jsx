import React from 'react'
import autobind from 'autobind-decorator'

import InputSection from './InputSection'
import NavigationButtons from './NavigationButtons'


class StudentsSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      students: [],
    }
  }

  @autobind
  addStudent(studentName) {
    this.setState({
      students: [ ...this.state.students, studentName]
    })
  }

  @autobind
  removeStudent(index) {
     this.setState({
      students: [ ...this.state.students.slice(0, index), ...this.state.students.slice(index + 1) ]
    })
  }

  render() {
    return(
      <div>
        <InputSection
          studentsList={this.state.students}
          addStudent={this.addStudent}
          removeStudent={this.removeStudent}
        />
        <br/>
        <NavigationButtons
          studentsList={this.state.students}
        />
      </div>
    )
  }
}

export default StudentsSection
