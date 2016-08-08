import { styles } from '../styles'

import React from 'react'
import { connect } from 'react-redux'
import { css } from 'aphrodite'
import Person from 'material-ui/svg-icons/social/person'
import Remove from 'material-ui/svg-icons/content/backspace'
import autobind from 'autobind-decorator'
import { List, ListItem, TextField, RaisedButton } from 'material-ui'

import { addNewStudent, removeAddedStudent } from 'actions/students'


class MainSection extends React.Component {
  @autobind
  handleInput() {
    const { addNewStudent } = this.props

    const createStudentInput = this.refs['createStudentInput'].input
    const studentName = createStudentInput.value

    if(!studentName) return

    createStudentInput.value = null
    addNewStudent(studentName)
  }

  @autobind
  removeStudent(student) {
    const { removeAddedStudent } = this.props

    removeAddedStudent(student._id)
  }

  render() {
    const { removeStudent, studentsStore } = this.props
    const { initiallyCreatedStudents } = studentsStore

    return(
      <div>
        <TextField
          ref='createStudentInput'
          hintText='Student name'
          type='text'
        />
        <RaisedButton
          label='ADD'
          className={css(styles.addButton)}
          primary={true}
          onTouchTap={this.handleInput}
        />
        <List className={css(styles.studentsList)}>
          {
            initiallyCreatedStudents.map((student, i) => (
              <ListItem
                className={css(styles.listItem)}
                key={i}
                primaryText={student.name}
                leftIcon={<Person />}
                rightIcon={<Remove />}
                onTouchTap={() => {this.removeStudent(student)}}
              />
            ))
          }
        </List>
      </div>
    )
  }
}

export default connect(store => ({ studentsStore: store.students }), {
  addNewStudent,
  removeAddedStudent,
})(MainSection)
