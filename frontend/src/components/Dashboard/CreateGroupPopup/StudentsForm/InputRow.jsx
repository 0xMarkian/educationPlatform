import React from 'react'
import {connect} from 'react-redux'
import {List, ListItem, TextField, RaisedButton} from 'material-ui'
import Remove from 'material-ui/svg-icons/content/backspace'
import Person from 'material-ui/svg-icons/social/person'


class InputRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      students: []
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput() {
    const newStudentName = this.refs['new-group-modal-students'].input.value
    this.refs['new-group-modal-students'].input.value = null

    this.setState({
      students: [ ...this.state.students, newStudentName]
    })
  }

  handleRemove(index) {
    this.setState({
      students: [ ...this.state.students.slice(0, index), ...this.state.students.slice(index + 1) ]
    })
  }

  render() {
    return(
      <div>
        <TextField
          ref='new-group-modal-students'
          id='new-group-modal-students'
          hintText='Student name'
          type='text'
        />
        <RaisedButton
          label={'ADD'}
          style={{marginLeft: 12}}
          primary={true}
          onTouchTap={this.handleInput}
        />
        <List style={{maxHeight: 150, overflowY: 'auto'}}>
          {this.state.students ? this.state.students.map((value, index) => (
            <ListItem
              key={index}
              primaryText={value}
              rightIcon={<Remove />}
              onTouchTap={() => {this.handleRemove(index)}}
            />
          )) : (null)}
        </List>
      </div>
    )
  }
}

export default connect(store => ({ commonStore: store.common }))(InputRow)