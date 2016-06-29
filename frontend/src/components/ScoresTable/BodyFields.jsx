import React from 'react'
import {connect} from 'react-redux'
import {TableBody, TableRow, TableRowColumn} from 'material-ui'

import {
  fetchSubjects,
  fetchScores,
  fetchStudents
} from 'actions/common'


class BodyFields extends React.Component {
  componentWillMount() {
    const {fetchSubjects, fetchScores, fetchStudents, commonStore} = this.props,
          subjectsList = commonStore.subjects.list,
          scoresList = commonStore.scores.list,
          studentsList = commonStore.students.list
    if(subjectsList.length === 1) fetchSubjects()
    if(studentsList.length === 1) fetchStudents()
    if(scoresList.length === 1) fetchScores()
  }

  render() {
    const subjectsList = this.props.commonStore.subjects.list,
          scoresList = this.props.commonStore.scores.list,
          studentsList = this.props.commonStore.students.list

    let sorted = {}
    for(let i = 0; i < scoresList.length; i++) {
      if(scoresList[i].student){
        sorted[scoresList[i].student._id] = {
          ...sorted[scoresList[i].student._id],
          [scoresList[i].course.subject]: scoresList[i].scoreValue
        }
      }
    }
    alert(1)

    return(
      <TableBody displayRowCheckBox={true}>
        <HeaderFields />
        {
          studentsList.map((value, index, array) => {
            let rows = []
            for(let i=0; i < subjectsList.length; i++) {
              rows.push(
                <TableRowColumn tooltip={value.name+' / '+subjectsList[i].name}
                >
                  {sorted[value._id] ? sorted[value._id][subjectsList[i]._id] : null}
                </TableRowColumn>)
            }
            return (
              <TableRow key={index}>
                <TableRowColumn>{value.name}</TableRowColumn>
                {rows}
              </TableRow>
            )
          })
        }
      </TableBody>
    )
  }
}

export default connect(store => ({
  commonStore: store.common
}), {
  fetchSubjects,
  fetchStudents,
  fetchScores
})(BodyFields)
