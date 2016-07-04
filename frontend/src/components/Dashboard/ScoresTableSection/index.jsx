import React from 'react'
import { connect } from 'react-redux'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui'

import { fetchSubjectsList, fetchStudentsList } from 'actions/group'
import HeaderFields from './HeaderFields'
import BodyFields from './BodyFields'


class ScoresTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    const { fetchSubjectsList, fetchStudentsList, groupStore } = this.props
    const subjectsList = groupStore.subjects.list
    const studentsList = groupStore.students.list

    if(!studentsList) fetchStudentsList()
    if(!subjectsList) fetchSubjectsList()
  }

  render() {
    const subjectsList = this.props.groupStore.subjects.list
    const studentsList = this.props.groupStore.students.list

    console.log('studentsList: ', studentsList)
    console.log('subjectsList: ', subjectsList)
    if(!subjectsList || !studentsList) return null

    return(
      <Table selectable={false}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <HeaderFields />
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <BodyFields />
        </TableBody>
      </Table>
    )
  }
}

export default connect(store => ({ groupStore: store.group }), { fetchSubjectsList, fetchStudentsList })(ScoresTable)
