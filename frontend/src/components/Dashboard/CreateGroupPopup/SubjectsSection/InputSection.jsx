import { muiStyles } from '../styles'

import React from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { DropDownMenu, MenuItem } from 'material-ui'

import {
  fetchSubjects,
} from 'actions/subjects'


class InputSection extends React.Component {
  @autobind
  handleInput(event, index, value) {
    const { subjectsStore, setChosenSubject } = this.props
    setChosenSubject(subjectsStore.data[index])
  }

  componentWillMount() {
    const { fetchSubjects } = this.props
    fetchSubjects()
  }

  render() {
    const subjects = this.props.subjectsStore.data

    if(!subjects) return null // Waiting for fetch to end

    return(
      <div>
        <label htmlFor='new-group-subject'>Pick a subject:</label><br/>
        <DropDownMenu
          maxHeight={300}
          autoWidth={true}
          value={subjects[0]._id}
          onChange={this.handleInput}
          menuStyle={muiStyles.dropDownMenu}
        >
          {
            subjects.map((subject, i) => (
              <MenuItem
                value={subject._id}
                primaryText={subject.name}
                key={i}
              ></MenuItem>
            ))
          }
        </DropDownMenu>
      </div>
    )
  }
}

export default connect(store => ({ subjectsStore: store.subjects }), {
  fetchSubjects,
})(InputSection)
