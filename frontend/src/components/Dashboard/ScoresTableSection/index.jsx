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

    this.rebuiltSubjects = rebuiltSubjects
  }

  render() {
    const scores = this.props.scoresStore.data
    const students = this.props.studentsStore.data
    const courses = this.props.coursesStore.data
    const { rebuiltSubjects } = this

    // Do not render until required lists are loaded
    if(!scores || !students || !courses || !rebuiltSubjects) return(<div>Loading in progress...</div>)

    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            {
              courses.map((course, i) => (
                <TableHeaderColumn
                  tooltip={rebuiltSubjects[course.subject]}
                  key={i}
                >
                  {rebuiltSubjects[course.subject] ?
                    (rebuiltSubjects[course.subject].length >= 12 ?
                      rebuiltSubjects[course.subject].slice(0, 10) + '...' : rebuiltSubjects[course.subject]
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
          students.map((student, studentIndex) => (
            <TableRow key={studentIndex}>
              <TableRowColumn>{student.name}</TableRowColumn>
              {
                // Going over subjects
                courses.map((course, subjectIndex) => (
                  <TableRowColumn key={subjectIndex}>
                    <TextField
                      type='text'
                      underlineShow={false}
                      id={course.subject + '/' + student._id}
                      defaultValue={scores[student._id][course.subject].scoreValue}
                      onBlur={
                        this.handleInput.bind(
                          this,
                          student._id,
                          courses[course.subject],
                          scores[student._id][course.subject]
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
