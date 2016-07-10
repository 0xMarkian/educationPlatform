import { styles } from '../styles'

import React from 'react'
import { css } from 'aphrodite'
import Remove from 'material-ui/svg-icons/content/backspace'
import Person from 'material-ui/svg-icons/social/person'
import {List, ListItem, TextField, RaisedButton} from 'material-ui'


class InputRow extends React.Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput() {
    const studentName = this.refs['new-group-modal-students'].input.value
    this.refs['new-group-modal-students'].input.value = null

    this.props.addStudent(studentName)
  }

  render() {
  const { studentsList, removeStudent } = this.props

    return(
      <div>
        <TextField
          ref='new-group-modal-students'
          id='new-group-modal-students'
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
          {studentsList ? studentsList.map((value, index) => (
            <ListItem
              key={index}
              primaryText={value}
              rightIcon={<Remove />}
              onClick={() => {removeStudent(index)}}
            />
          )) : null}
        </List>
      </div>
    )
  }
}

export default InputRow
