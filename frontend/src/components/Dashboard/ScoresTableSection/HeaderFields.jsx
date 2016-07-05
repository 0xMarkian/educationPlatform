import React from 'react'
import {connect} from 'react-redux'
import {TableRow, TableHeaderColumn, TableRowColumn} from 'material-ui'

class HeaderFields extends React.Component {
  render() {
    const subjectsList = this.props.groupStore.subjects.list

    if(!subjectsList) return null

    return(
      <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
        {
          subjectsList.map( (subject, i) => {
            return (
              <TableHeaderColumn
                tooltip={subject.name}
                key={i}
              >
                {subject.name ?
                  (subject.name.length >= 12 ? subject.name.slice(0, 10) + '...' : subject.name)
                  : null
                }
              </TableHeaderColumn>
            )
          })
        }
      </TableRow>
    )
  }
}

export default connect(store => ({
  groupStore: store.group
}))(HeaderFields)
