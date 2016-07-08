import React from 'react'
import { connect } from 'react-redux'
import { DropDownMenu, MenuItem } from 'material-ui'

import {
  fetchSubjects,
} from 'actions/subjects'


class InputRow extends React.Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
  }

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

    if(!subjects) return null // Waiting fetch to end

    return(
      <div>
        <label htmlFor='new-group-subject'>Pick a subject:</label><br/>
        <DropDownMenu
          maxHeight={300}
          autoWidth={true}
          value={subjects[0]._id}
          onChange={this.handleInput}
          menuStyle={{overflowX: 'hidden'}}
        >
          {
            subjects.map((subject, index) => (
              <MenuItem
                value={subject._id}
                primaryText={subject.name}
                key={index}
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
})(InputRow)
