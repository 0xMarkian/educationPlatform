/**
 * Created by vlad on 04.07.16.
 */

import React from 'react'
import { connect } from 'react-redux'

import ScoresTableSection from './ScoresTableSection'

const Dashboard extends React.Component {
  render() {
    <div>
      <ScoresTableSection />
    </div>
  }
}

export default connect()(Dashboard)
