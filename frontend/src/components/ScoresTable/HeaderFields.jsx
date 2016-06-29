import React from 'react'
import {connect} from 'react-redux'
import {TableRow, TableHeaderColumn, TableRowColumn} from 'material-ui'

import {fetchSubjects} from 'actions/common'


class HeaderFields extends React.Component {
  componentWillMount() {
    const {fetchSubjects, commonStore} = this.props,
          {list} = commonStore.subjects

    if(list.length === 1) fetchSubjects()
  }

  render() {
    const {list} = this.props.commonStore.subjects

    return(
      <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
        {
          list.map((value, index, array) => {
            return (
              <TableHeaderColumn
                tooltip={value.name}
                key={index}
              >
                {value.name ? value.name.slice(0, 10) + '...' : null}
              </TableHeaderColumn>
            )
          })
        }
      </TableRow>
    )
  }
}

export default connect(store => ({
  commonStore: store.common
}), {
  fetchSubjects
})(HeaderFields)
