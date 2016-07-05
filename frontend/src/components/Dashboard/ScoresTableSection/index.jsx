import React from 'react'
import { connect } from 'react-redux'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui'

import { fetchSubjectsList, fetchStudentsList, fetchScoresList } from 'actions/group'


class ScoresTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    const { fetchSubjectsList, fetchStudentsList, fetchScoresList, groupStore } = this.props
    const subjectsList = groupStore.subjects.list
    const studentsList = groupStore.students.list
    const scoresList = groupStore.scores.list

    if(!studentsList) fetchStudentsList()
    if(!subjectsList) fetchSubjectsList()
    if(!scoresList) fetchScoresList()
  }


  render() {
    const subjectsList = this.props.groupStore.subjects.list
    const studentsList = this.props.groupStore.students.list
    const scoresList = this.props.groupStore.scores.list

    // Do not render until all of the lists are loaded
    if(!subjectsList || !studentsList || !scoresList) return(<div>Loading in progress...</div>)

    // Creating a list of needed subjects, formatted like {subjectId: subjectName}
    const usedSubjects = {}
    studentsList.forEach((student) => {
      usedSubjects[student.course.subject] = subjectsList.filter(s => (s._id === student.course.subject))[0].name
    })

    // Flattering [{name: 'foo', _id: 'bar', scoreValue: 'baz'}] to {foo: {bar: 'baz'}}
    const rebuiltStudentsList = {}
    scoresList.forEach((score, i) => {
      rebuiltStudentsList[score.student._id] = {
        ...rebuiltStudentsList[score.student._id],
        [score.course.subject]: score.scoreValue
      }
    })

    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            {
              Object.keys(usedSubjects).map( (subject, i) => (
                <TableHeaderColumn
                  tooltip={usedSubjects[subject]}
                  key={i}
                >
                  {usedSubjects[subject] ?
                    (usedSubjects[subject].length >= 12 ?
                      usedSubjects[subject].slice(0, 10) + '...' : usedSubjects[subject]
                    ): null
                  }
                </TableHeaderColumn>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {
          studentsList.map((studentInstance, studentIndex) => (
            <TableRow key={studentIndex}>
              <TableRowColumn>{studentInstance.student.name}</TableRowColumn>
              {
                Object.keys(usedSubjects).map((subjectInstance, subjectIndex) => {
                  return(
                    <TableRowColumn key={subjectIndex}>
                      {rebuiltStudentsList[studentInstance.student._id][subjectInstance]}
                    </TableRowColumn>
                  )
                })
              }
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
    )
  }
}

export default connect(store => ({ groupStore: store.group }), {
  fetchSubjectsList,
  fetchStudentsList,
  fetchScoresList
})(ScoresTable)
