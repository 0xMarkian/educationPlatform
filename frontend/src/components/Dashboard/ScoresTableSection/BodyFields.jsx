import React from 'react'
import {connect} from 'react-redux'
import {TableBody, TableRow, TableRowColumn} from 'material-ui'


class BodyFields extends React.Component {
  render() {
    return(
      null
    )
  }
}

export default connect(store => ({ groupStore: store.group }))(BodyFields)
