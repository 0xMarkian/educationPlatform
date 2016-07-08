import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {
  Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn,
  TextField
} from 'material-ui'

import { fetchStudents } from 'actions/students'
import { fetchSubjects } from 'actions/subjects'
import { fetchScores, applyNewScore } from 'actions/scores'


class ScoresTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subjectsToRender: null,
    }
  }

  handleInput(studentId, courseId, event){
    const { applyNewScore } = this.props
    const inputValue = event.target.value
    applyNewScore(studentId, courseId, inputValue)
  }

  componentWillMount() {
    const { fetchSubjects, fetchStudents, fetchScores } = this.props
    fetchStudents()
    fetchScores()
    fetchSubjects()
  }

  componentWillReceiveProps(nextProps) {
    const { groupStore, studentsStore, subjectsStore, scoresStore } = nextProps
    const subjects = subjectsStore.data,
          students = studentsStore.data

    if(!subjects || !students) return null

    // Creating a list of all subjects, formatted like { subjectId: subjectName }
    const rebuiltSubjects = {}
    subjects.forEach(subject => { rebuiltSubjects[subject._id] = subject.name })

    const subjectsToRender = {}
    Object.keys(students).forEach(studentId => {
      subjectsToRender[students[studentId].course.subject] =
       rebuiltSubjects[students[studentId].course.subject]
    })

    this.setState({ subjectsToRender })
  }

  render() {
    const { subjectsToRender } = this.state
    const studentsScores = this.props.scoresStore.data
    const students = this.props.studentsStore.data

    // Do not render until required lists are loaded
    if(!studentsScores || !subjectsToRender) return(<div>Loading in progress...</div>)

    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            {
              Object.keys(subjectsToRender).map( (subject, i) => (
                <TableHeaderColumn
                  tooltip={subjectsToRender[subject]}
                  key={i}
                >
                  {subjectsToRender[subject] ?
                    (subjectsToRender[subject].length >= 12 ?
                      subjectsToRender[subject].slice(0, 10) + '...' : subjectsToRender[subject]
                    ): null
                  }
                </TableHeaderColumn>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {
          // Iterating over all of the students including the ones who have any scores.
          // This object is ONLY used to build the frame of the table, all of the data about students'
          // scores is being taken from the scores object as long as the students object does not provide any.
          Object.keys(students).map((studentId, studentIndex) => (
            <TableRow key={studentIndex}>
              <TableRowColumn>{students[studentId].studentName}</TableRowColumn>
              {
                // Going over subjects
                Object.keys(subjectsToRender).map((subjectId, subjectIndex) => (
                  <TableRowColumn key={subjectIndex}>
                    <TextField
                      type='text'
                      underlineShow={false}
                      id={subjectId + '/' + studentId}
                      defaultValue={studentsScores[studentId][subjectId].scoreValue}
                      onBlur={
                        this.handleInput.bind(this, studentId, studentsScores[studentId][subjectId].courseId)
                      }
                    />
                  </TableRowColumn>
                ))
              }
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
    )
  }
}

export default connect(store => ({
  groupStore: store.group,
  studentsStore: store.students,
  subjectsStore: store.subjects,
  scoresStore: store.scores,
}), {
  fetchSubjects,
  fetchStudents,
  fetchScores,
  applyNewScore,
})(ScoresTable)
