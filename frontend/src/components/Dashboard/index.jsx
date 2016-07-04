import React from 'react'
import { connect } from 'react-redux'

import ScoresTableSection from './ScoresTableSection'

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <ScoresTableSection />
      </div>
    )
  }
}

export default connect()(Dashboard)
