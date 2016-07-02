import React from 'react'
import {connect} from 'react-redux'
import {DropDownMenu, MenuItem} from 'material-ui'

import {
  fetchSubjectsList,
  sendChosenSubject
} from 'actions/group'


class InputRow extends React.Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(event, index, value) {
    const { sendChosenSubject, groupStore } = this.props
    sendChosenSubject(groupStore.subjects.list[index])
  }

  componentWillMount() {
    const {fetchSubjectsList} = this.props
    fetchSubjectsList()
  }

  render() {
    const {subjects} = this.props.groupStore

    if(!subjects.list) return null // Waiting fetch to end
    return(
      <div>
        <label htmlFor='new-group-subject'>Pick a subject:</label><br/>
        <DropDownMenu
          maxHeight={300}
          autoWidth={true}
          value={subjects.list[0]._id}
          onChange={this.handleInput}
          menuStyle={{overflowX: 'hidden'}}
        >
          {
            subjects.list.map((subject, index) => {
              return (
                <MenuItem
                  value={subject._id}
                  primaryText={subject.name}
                  key={index}
                ></MenuItem>)
            })
          }
        </DropDownMenu>
      </div>
    )
  }
}

export default connect(store => ({ groupStore: store.group }), {
  fetchSubjectsList,
  sendChosenSubject
})(InputRow)
