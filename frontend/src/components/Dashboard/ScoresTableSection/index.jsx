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
import { fetchCourses } from 'actions/courses'
import { fetchScores, applyNewScore } from 'actions/scores'


class ScoresTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subjectsToRender: null,
    }
  }

  handleInput(studentId, courseId, prevScore, event){
    const { applyNewScore } = this.props
    const inputValue = event.target.value
    let scoreToUpdateId

    if(!prevScore) scoreToUpdateId = null // The score does not exist in the DB yet
    else scoreToUpdateId = prevScore.scoreId


    applyNewScore(studentId, courseId, inputValue, scoreToUpdateId)
  }

  componentWillMount() {
    const { fetchSubjects, fetchStudents, fetchScores, fetchCourses } = this.props
    fetchStudents()
    fetchScores()
    fetchCourses()
    fetchSubjects()
  }

  componentWillReceiveProps(nextProps) {
    const { groupStore, studentsStore, subjectsStore, scoresStore, coursesStore } = nextProps
    const subjects = subjectsStore.data,
          students = studentsStore.data,
          courses = coursesStore.data

    if(!subjects || !students || !courses) return false

    // Creating a list of ALL subjects, formatted like { subjectId: subjectName }
    const rebuiltSubjects = {}
    subjects.forEach(subject => { rebuiltSubjects[subject._id] = subject.name })

    // Creating a list of NEEDED subjects, formatted like { subjectId: subjectName }
    const subjectsToRender = {}
    courses.map(course => {
      subjectsToRender[course.subject] = {
        courseId: course._id,
        name: rebuiltSubjects[course.subject]
      }
    })

    this.setState({ subjectsToRender })
  }

  render() {
    const { subjectsToRender } = this.state
    const scores = this.props.scoresStore.data
    const students = this.props.studentsStore.data

    // Do not render until required lists are loaded
    if(!subjectsToRender || !scores || !students) return(<div>Loading in progress...</div>)

    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            {
              Object.keys(subjectsToRender).map((subject, i) => (
                <TableHeaderColumn
                  tooltip={subjectsToRender[subject].name}
                  key={i}
                >
                  {subjectsToRender[subject].name ?
                    (subjectsToRender[subject].name.length >= 12 ?
                      subjectsToRender[subject].name.slice(0, 10) + '...' : subjectsToRender[subject].name
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
              <TableRowColumn>{students[studentId]}</TableRowColumn>
              {
                // Going over subjects
                Object.keys(subjectsToRender).map((subjectId, subjectIndex) => (
                  <TableRowColumn key={subjectIndex}>
                    <TextField
                      type='text'
                      underlineShow={false}
                      id={subjectId + '/' + studentId}
                      defaultValue={scores[studentId][subjectId].scoreValue}
                      onBlur={
                        this.handleInput.bind(
                          this,
                          studentId,
                          subjectsToRender[subjectId].courseId,
                          scores[studentId][subjectId]
                        )
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
  coursesStore: store.courses,
}), {
  fetchSubjects,
  fetchStudents,
  fetchScores,
  fetchCourses,
  applyNewScore,
})(ScoresTable)
