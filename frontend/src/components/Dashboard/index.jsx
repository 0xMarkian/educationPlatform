import React from 'react'
import { connect } from 'react-redux'

import Header from '../Header'
import ScoresTableSection from './ScoresTableSection'
import { fetchUserData } from 'actions/user'


class Dashboard extends React.Component {
  componentWillMount() {
    const { fetchUserData } = this.props

    fetchUserData()
  }

  render() {
    return (
      <div>
        <Header />
        <ScoresTableSection />
      </div>
    )
  }
}

export default connect(null, {
  fetchUserData,
})(Dashboard)
