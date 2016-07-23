import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'


import Header from '../../modules/Header/'
import ScoresTableSection from './ScoresTableSection/'

class Dashboard extends Component {
  render() {
    const { userData } = this.props
    if(!userData) return null

    return (
      <div>
        <Header />
        <ScoresTableSection />
      </div>
    )
  }
}

export default connect( store => ({ userData: store.user.data}), { push })(Dashboard)
