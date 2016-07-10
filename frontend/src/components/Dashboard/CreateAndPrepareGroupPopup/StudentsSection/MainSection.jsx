import { styles } from '../styles'

import React from 'react'
import { connect } from 'react-redux'
import { css } from 'aphrodite'
import Remove from 'material-ui/svg-icons/content/backspace'
import autobind from 'autobind-decorator'
import { List, ListItem, TextField, RaisedButton } from 'material-ui'

import { addNewStudent, removeAddedStudent } from 'actions/students'


class InputSection extends React.Component {
  @autobind
  handleInput() {
    const { addNewStudent } = this.props
    const studentName = this.refs['newStudentInput'].input.value
    this.refs['newStudentInput'].input.value = null

    addNewStudent(studentName)
  }

  @autobind
  removeStudent(studentId) {
    const { removeAddedStudent } = this.props

    removeAddedStudent(studentId)
  }

  render() {
    const { removeStudent, studentsStore } = this.props
    const { initiallyCreatedStudents } = studentsStore

    return(
      <div>
        <TextField
          ref='newStudentInput'
          hintText='Student name'
          type='text'
        />
        <RaisedButton
          label='ADD'
          className={css(styles.addButton)}
          primary={true}
          onClick={this.handleInput}
        />
        <List className={css(styles.studentsList)}>
          {
            Object.keys(initiallyCreatedStudents).map((studentId, index) => (
              <ListItem
                key={index}
                primaryText={initiallyCreatedStudents[studentId]}
                rightIcon={<Remove />}
                onClick={() => {this.removeStudent(studentId)}}
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
})(InputSection)
