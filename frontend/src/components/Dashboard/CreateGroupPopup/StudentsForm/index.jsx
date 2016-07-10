import React from 'react'
import { connect } from 'react-redux'

import InputRow from './InputRow'
import ButtonsRow from './ButtonsRow'


class StudentsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      students: [],
    }
    this.addStudent = this.addStudent.bind(this)
    this.removeStudent = this.removeStudent.bind(this)
  }

  addStudent(studentName) {
    this.setState({
      students: [ ...this.state.students, studentName]
    })
  }

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

export default connect()(StudentsForm)
