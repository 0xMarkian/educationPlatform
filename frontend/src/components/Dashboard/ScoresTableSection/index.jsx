import React from 'react'
import { connect } from 'react-redux'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TextField } from 'material-ui'

import { fetchSubjectsList, fetchStudentsList, fetchScoresList } from 'actions/group'


class ScoresTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subjectsList: null,
      studentsList: null,
      scoresList: null,
      groupSubjects: null,
      rebuiltStudentsList: null,
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(event){
    const inputValue = event.target.value
    console.log(`Got an input: ${inputValue}`)
  }

  componentWillMount() {
    const { fetchSubjectsList, fetchStudentsList, fetchScoresList, groupStore } = this.props
    const subjectsPromise = new Promise((resolve, reject) => { fetchSubjectsList(resolve, reject) }),
          studentsPromise = new Promise((resolve, reject) => { fetchStudentsList(resolve, reject) }),
          scoresPromise = new Promise((resolve, reject) => { fetchScoresList(resolve, reject) })

    Promise.all([subjectsPromise, studentsPromise, scoresPromise]).then(() => {
      const subjectsList = this.props.groupStore.subjects.list,
            studentsList = this.props.groupStore.students.list,
            scoresList = this.props.groupStore.scores.list

      // Creating a list of needed subjects, formatted like {subjectId: subjectName}
      const rebuiltSubjectsList = subjectsArr => {
        const subjectsObj = {}
        subjectsArr.map(subject => {
          subjectsObj[subject._id] = subject.name
        })
        return subjectsObj
      }

      console.log(rebuiltSubjectsList)


      const groupSubjects = {}
      studentsList.forEach((student) => {
        groupSubjects[student.course.subject] = subjectsList.filter(s => (s._id === student.course.subject))[0].name
      })

      // Flattering [{name: 'foo', _id: 'bar', scoreValue: 'baz'}] to {foo: {bar: 'baz'}}
      const rebuiltStudentsList = {}
      scoresList.forEach((score, i) => {
        rebuiltStudentsList[score.student._id] = {
          ...rebuiltStudentsList[score.student._id],
          [score.course.subject]: score.scoreValue
        }
      })

      this.setState({ subjectsList, studentsList, scoresList, groupSubjects, rebuiltStudentsList })
    }).catch(err => {throw new Error(err)})
  }


  render() {
    const { groupSubjects, studentsList, rebuiltStudentsList } = this.state

    // Do not render until all of the required lists are loaded
    if(!groupSubjects || !studentsList || !rebuiltStudentsList) return(<div>Loading in progress...</div>)

    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            {
              Object.keys(groupSubjects).map( (subject, i) => (
                <TableHeaderColumn
                  tooltip={groupSubjects[subject]}
                  key={i}
                >
                  {groupSubjects[subject] ?
                    (groupSubjects[subject].length >= 12 ?
                      groupSubjects[subject].slice(0, 10) + '...' : groupSubjects[subject]
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
                Object.keys(groupSubjects).map((subjectId, subjectIndex) => (
                  <TableRowColumn key={subjectIndex}>
                    <TextField
                      id={studentInstance._id + '/' + subjectId}
                      type='text'
                      underlineShow={false}
                      defaultValue={rebuiltStudentsList[studentInstance.student._id][subjectId]}
                      onBlur={this.handleInput}
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
  fetchScoresList
})(ScoresTable)
