import { muiStyles } from './styles'
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
import { fetchScores, applyNewScore, closeScoreAppliedMsg } from 'actions/scores'


class ScoresTable extends React.Component {
  constructor(props) {
    super(props)
  }

  handleInput(studentId, courseId, scoreToUpdateId, event){
    const { applyNewScore } = this.props
    const inputValue = event.target.value

    applyNewScore(scoreToUpdateId, studentId, courseId, inputValue)
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
    const { scoresStore, studentsStore, coursesStore, closeScoreAppliedMsg } = this.props
    const { rebuiltSubjects } = this
    const { IsShownScoreAppliedMsg } = scoresStore
    const scores = scoresStore.data
    const students = studentsStore.data
    const courses = coursesStore.data

    if(!scores || !students || !courses || !rebuiltSubjects)
      return(
        <div>It seems you do not have any groups yet.
          Would you like to <Link to='/newGroup'>create one</Link>?
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
            // Iterating over all of the students including the ones who have any scores.
            // This object is ONLY used to build the frame of the table, all of the data about students'
            // scores is being taken from the scores object because the students object doesn't provide any.
            students.map((student, studentIndex) => (
              <TableRow key={studentIndex}>
                <TableRowColumn>{student.name}</TableRowColumn>
                {
                  // Going over subjects
                  courses.map((course, subjectIndex) => {
                    let currentScoreObj
                    if(scores[student._id]){
                      if(scores[student._id][course.subject])
                        currentScoreObj = scores[student._id][course.subject]
                    } else{
                      currentScoreObj = { scoreId: null, scoreValue: null }
                    }

                    return(
                      <TableRowColumn key={subjectIndex}>
                        <TextField
                          type='text'
                          underlineShow={false}
                          id={course.subject + '/' + student._id}
                          defaultValue={currentScoreObj.scoreValue}
                          onBlur={
                            this.handleInput.bind(
                              this,
                              student._id,
                              course._id,
                              currentScoreObj.scoreId
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
        <Snackbar
          open={IsShownScoreAppliedMsg}
          message='New score has been successfully applied!'
          autoHideDuration={muiStyles.snackbar.hideDuration}
          onRequestClose={closeScoreAppliedMsg}
        />
      </div>
    )
  }
}

export default connect(store => ({ groupStore: store.group, studentsStore: store.students,
  subjectsStore: store.subjects, scoresStore: store.scores, coursesStore: store.courses,
}), {
  fetchSubjects, fetchStudents, fetchScores, fetchCourses, applyNewScore, closeScoreAppliedMsg,
})(ScoresTable)
