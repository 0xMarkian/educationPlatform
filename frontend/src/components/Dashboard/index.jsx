import React from 'react'

import Header from '../Header'
import ScoresTableSection from './ScoresTableSection'

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ScoresTableSection />
      </div>
    )
  }
}

export default Dashboard
