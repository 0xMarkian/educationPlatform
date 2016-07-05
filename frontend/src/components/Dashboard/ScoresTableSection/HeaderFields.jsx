import React from 'react'
import { connect } from 'react-redux'
import { TableRow, TableHeaderColumn } from 'material-ui'

class HeaderFields extends React.Component {
  render() {
    const subjectsList = this.props.groupStore.subjects.list
    const { usedSubjects } = this.props
    return(
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Name</TableHeaderColumn>
            {
              Object.keys(usedSubjects).map( (subject, i) => (
              <TableHeaderColumn
                tooltip={usedSubjects[subject]}
                key={i}
              >
              {
                usedSubjects[subject] ?
                  (usedSubjects[subject].length >= 12 ?
                    usedSubjects[subject].slice(0, 10) + '...' : usedSubjects[subject]
                  ): null
              }
              </TableHeaderColumn>
            ))
          }
        </TableRow>
      </TableHeader>
    )
  }
}

export default connect(store => ({
  groupStore: store.group
}))(HeaderFields)
