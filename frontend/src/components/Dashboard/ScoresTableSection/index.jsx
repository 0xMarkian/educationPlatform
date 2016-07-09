import React from 'react'
import { connect } from 'react-redux'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TextField } from 'material-ui'

import { fetchSubjectsList, fetchStudentsList, fetchScoresList, applyNewScore } from 'actions/group'


class ScoresTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groupSubjectsList: null,
      rebuiltSubjectsList: null,
    }
  }

  handleInput(studentId, courseId, event){
    const { applyNewScore } = this.props
    const inputValue = event.target.value
    applyNewScore(studentId, courseId, inputValue)
  }

  componentWillMount() {
    const { fetchSubjectsList, fetchStudentsList, fetchScoresList } = this.props
    const subjectsPromise = new Promise((resolve, reject) => { fetchSubjectsList(resolve, reject) }),
          studentsPromise = new Promise((resolve, reject) => { fetchStudentsList(resolve, reject) }),
          scoresPromise = new Promise((resolve, reject) => { fetchScoresList(resolve, reject) })

    Promise.all([subjectsPromise, studentsPromise, scoresPromise]).then(() => {
      const { groupStore } = this.props
      const subjectsList = groupStore.subjects.list,
            studentsList = groupStore.students.list,
            scoresList = groupStore.scores.list

      // Creating a list of all subjects, formatted like {subjectId: subjectName}
      const rebuiltSubjectsList = {}
      subjectsList.forEach(subject => {
        rebuiltSubjectsList[subject._id] = subject.name
      })

      // Creating a list of needed subjects, formatted like {subjectId: subjectName}
      const groupSubjectsList = {}
      studentsList.forEach((student) => {
        groupSubjectsList[student.course.subject] = rebuiltSubjectsList[student.course.subject]
      })

      // Flattering [{name: 'foo', _id: 'bar', scoreValue: 'baz'}] to {foo: {bar: 'baz'}}
      const rebuiltStudentsList = {}
      scoresList.forEach((score, i) => {
        rebuiltStudentsList[score.student._id] = {
          ...rebuiltStudentsList[score.student._id],
          studentName: score.student.name,
          [score.course.subject]: {
            courseId: score.course._id,
            scoreValue: score.scoreValue,
          }
        }
      })

      this.setState({ groupSubjectsList, rebuiltStudentsList })
    }).catch(err => {throw new Error(err)})
  }


  render() {
    const { groupSubjectsList, rebuiltStudentsList } = this.state

    // Do not render until required lists are loaded
    if(!groupSubjectsList || !rebuiltStudentsList) return(<div>Loading in progress...</div>)
    console.log(rebuiltStudentsList)
    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            {
              Object.keys(groupSubjectsList).map( (subject, i) => (
                <TableHeaderColumn
                  tooltip={groupSubjectsList[subject]}
                  key={i}
                >
                  {groupSubjectsList[subject] ?
                    (groupSubjectsList[subject].length >= 12 ?
                      groupSubjectsList[subject].slice(0, 10) + '...' : groupSubjectsList[subject]
                    ): null
                  }
                </TableHeaderColumn>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {
          // Going over students
          Object.keys(rebuiltStudentsList).map((studentId, studentIndex) => (
            <TableRow key={studentIndex}>
              <TableRowColumn>{rebuiltStudentsList[studentId].studentName}</TableRowColumn>
              {
                // Going over subjects
                Object.keys(groupSubjectsList).map((subjectId, subjectIndex) => (
                  <TableRowColumn key={subjectIndex}>
                    <TextField
                      id={subjectId + '/' + studentId}
                      type='text'
                      underlineShow={false}
                      defaultValue={rebuiltStudentsList[studentId][subjectId].scoreValue}
                      onBlur={
                        this.handleInput.bind(this, studentId, rebuiltStudentsList[studentId][subjectId].courseId)
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

export default connect(store => ({ groupStore: store.group }), {
  fetchSubjectsList,
  fetchStudentsList,
  fetchScoresList,
  applyNewScore,
})(ScoresTable)
