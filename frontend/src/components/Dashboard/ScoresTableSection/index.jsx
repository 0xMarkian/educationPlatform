import { muiStyles } from './styles'

import autobind from 'autobind-decorator'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {
  Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn,
  TextField, Snackbar
} from 'material-ui'

import { fetchStudents } from 'actions/students'
import { fetchSubjects } from 'actions/subjects'
import { fetchCourses } from 'actions/courses'
import { fetchScores, applyNewScore } from 'actions/scores'


class ScoresTable extends React.Component {
  constructor(props) {
    super(props)
  }

  @autobind
  parseInput(scoreId) {
    const inputValue = this.refs[scoreId].input.value
    const parsedValue = inputValue.replace(/[^0-9]/ig, '')
    
    this.refs[scoreId].input.value = parsedValue
  }

  @autobind
  handleInput(studentId, courseId, scoreToUpdateId) {
    return event => {
      const { applyNewScore } = this.props
      const inputValue = event.target.value

      applyNewScore(scoreToUpdateId, studentId, courseId, inputValue)
    }
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
    const { scoresStore, studentsStore, coursesStore } = this.props
    const { rebuiltSubjects } = this
    const scores = scoresStore.data
    const students = studentsStore.data
    const courses = coursesStore.data

    if(!scores || !students || !courses || !rebuiltSubjects)
      return(
        <div>It seems you do not have any groups yet.
          Would you like to <Link to='/create-group'>create one</Link>?
        </div>
      )

    return (
      <div>
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
            students.map((student, studentIndex) => (
              <TableRow key={studentIndex}>
                <TableRowColumn>{student.name}</TableRowColumn>
                {
                  courses.map((course, i) => {
                    const curStudentScores = scores[student._id]
                    let currentScoreObj
                    if(curStudentScores && curStudentScores[course.subject]){
                      currentScoreObj = curStudentScores[course.subject]
                    } else{
                      currentScoreObj = { scoreId: null, scoreValue: null }
                    }

                    const { scoreId, scoreValue } = currentScoreObj
                    return(
                      <TableRowColumn key={i}>
                        <TextField
                          type='text'
                          underlineStyle={muiStyles.underline}
                          underlineFocusStyle={muiStyles.underlineFocus}
                          inputStyle={muiStyles.scoreInput}
                          id={scoreId}
                          ref={scoreId}
                          defaultValue={scoreValue}
                          fullWidth={true}
                          onChange={() => {this.parseInput(scoreId)}}
                          onBlur={
                            this.handleInput(
                              student._id,
                              course._id,
                              scoreId
                            )
                          }
                        />
                      </TableRowColumn>
                    )
                  })
                }
              </TableRow>
            ))
          }
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default connect(store => ({ groupStore: store.group, studentsStore: store.students,
  subjectsStore: store.subjects, scoresStore: store.scores, coursesStore: store.courses,
}), {
  fetchSubjects, fetchStudents, fetchScores, fetchCourses, applyNewScore,
})(ScoresTable)
