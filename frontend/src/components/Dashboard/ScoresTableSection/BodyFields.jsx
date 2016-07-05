import React from 'react'
import {connect} from 'react-redux'
import {TableBody, TableRow, TableRowColumn} from 'material-ui'


class BodyFields extends React.Component {
  render() {
    const subjectsList = this.props.groupStore.subjects.list
    const studentsList = this.props.groupStore.students.list
    const scoresList = this.props.groupStore.students.list

    studentsList.map((s)=>{
      alert(s.name)
    })
    return(
      <TableBody displayRowCheckbox={false}>
        {
          studentsList.map((student, i) => {
            alert(student.name)
            return(
              <TableRow>
                <TableRowColumn>{student.name}</TableRowColumn>
              </TableRow>
            )
          })
        }
      </TableBody>
    )
  }
}

export default connect(store => ({ groupStore: store.group }))(BodyFields)
      // <TableRow>
      //   <TableRowColumn>Stuart</TableRowColumn>
      //   <TableRowColumn>10</TableRowColumn>
      //   <TableRowColumn>null</TableRowColumn>
      // </TableRow>
