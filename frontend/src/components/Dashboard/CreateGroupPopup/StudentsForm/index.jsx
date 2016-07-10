import React from 'react'
import autobind from 'autobind-decorator'

import InputRow from './InputRow'
import ButtonsRow from './ButtonsRow'


class StudentsForm extends React.Component {
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
        <InputRow
          studentsList={this.state.students}
          addStudent={this.addStudent}
          removeStudent={this.removeStudent}
        />
        <br/>
        <ButtonsRow
          studentsList={this.state.students}
        />
      </div>
    )
  }
}

export default StudentsForm
