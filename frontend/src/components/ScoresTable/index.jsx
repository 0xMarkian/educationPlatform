import 'fixed-data-table/dist/fixed-data-table.css'
import React from 'react'
import {connect} from 'react-redux'
import {Table, Column, Cell} from 'fixed-data-table';

import {
  fetchSubjects,
  fetchScores,
  fetchStudents
} from 'actions/common'


class ScoresTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rows : [],
      columnWidths: {
        name: 400,
        subject: 125
      }
    }
    this.resizeEnd = this.resizeEnd.bind(this)
  }

  componentWillMount() {
    const {commonStore, fetchSubjects, fetchStudents, fetchScores} = this.props
    const fetchDependencies = new Promise((resolve, reject) => {
      let resolved = 0
      let needToBeResolved = 0
      const resolver = () => {
        resolved++
        if(resolved === needToBeResolved) resolve()
      }
      if(commonStore.subjects.list.length === 1) needToBeResolved++
      if(commonStore.students.list.length === 1) needToBeResolved++
      if(commonStore.scores.list.length === 1) needToBeResolved++
      if(commonStore.subjects.list.length === 1) fetchSubjects(resolver)
      if(commonStore.students.list.length === 1) fetchStudents(resolver)
      if(commonStore.scores.list.length === 1) fetchScores(resolver)
    }).then(() => {
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

      const finalStudentsList = []
      for(let i = 0; i < studentsList.length; i++) {
        const student = {}
        for(let j = 0; j < subjectsList.length; j++) {
          if(sorted[studentsList[i]._id]) {
            if(sorted[studentsList[i]._id][subjectsList[j]._id]) {
              student[subjectsList[j].name] = sorted[studentsList[i]._id][subjectsList[j]._id]
            }
          }
        }
        finalStudentsList.push({name: studentsList[i].name, ...student})
      }

      this.setState({ rows: finalStudentsList })
    })
  }

  resizeEnd(newWidth, key) {
    this.setState({
      columnWidths: {
        ...this.state.columnWidths,
        [key]: newWidth
      }
    })
  }

  render() {
    const subjectsList = this.props.commonStore.subjects.list

    return(
      <Table
        height={document.documentElement.clientHeight - 56}
        width={document.documentElement.clientWidth}
        rowsCount={this.state.rows.length}
        rowHeight={56}
        headerHeight={56}
        isColumnResizing={false}
        onColumnResizeEndCallback={this.resizeEnd}
        rowGetter={(rowIndex => (this.state.rows[rowIndex])).bind(this)}
      >
        <Column
          width={this.state.columnWidths.name}
          fixed={true}
          dataKey='name'
          label='Name'
          isResizable={true}
        />
        {
          subjectsList.map((value, index, array) => {
            return value ?
              <Column
                contentEditable={true}
                align='center'
                isResizable={true}
                allowCellsRecycling={true}
                key={index}
                dataKey={value.name}
                width={this.state.columnWidths[value.name] || this.state.columnWidths.subject}
                label={value.name}
              />
            : null
          })
        }
      </Table>
    )
  }
}

export default connect(store => ({
  commonStore: store.common,
}), {
  fetchSubjects,
  fetchScores,
  fetchStudents
})(ScoresTable)