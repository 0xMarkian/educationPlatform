import 'fixed-data-table/dist/fixed-data-table.css'
import React from 'react'
import {connect} from 'react-redux'

import {
  fetchSubjects,
  fetchScores,
  fetchStudents
} from 'actions/common'


class ScoresTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div>test</div>
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