import React from 'react'
import {connect} from 'react-redux'
import {DropDownMenu, MenuItem} from 'material-ui'

import {
  fetchSubjects,
  setChosenSubject
} from 'actions/common'


class InputRow extends React.Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(event, index, value) {
    const {setChosenSubject, commonStore} = this.props
    setChosenSubject(commonStore.subjects.list[index])
  }

  componentWillMount() {
    const {fetchSubjects} = this.props
    fetchSubjects()
  }

  render() {
    const {subjects} = this.props.commonStore

    return(
      <div>
        <label htmlFor='new-group-subject'>Pick a subject:</label><br/>
        <DropDownMenu
          maxHeight={300}
          autoWidth={true}
          value={subjects.chosen ? subjects.chosen._id : subjects.list[0]._id}
          onChange={this.handleInput}
          menuStyle={{overflowX: 'hidden'}}
        >
          {
            subjects.list.map((value, index) => {
              return (
                <MenuItem
                  value={value._id}
                  primaryText={value.name}
                  key={index}
                ></MenuItem>)
            })
          }
        </DropDownMenu>
      </div>
    )
  }
}

export default connect(store => ({ commonStore: store.common }), {
  fetchSubjects,
  setChosenSubject
})(InputRow)