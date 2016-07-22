import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'


import Header from '../Header'
import ScoresTableSection from './ScoresTableSection'

class Dashboard extends React.Component {
  componentWillMount() {
    const { userNeedsAccount, push } = this.props

    if(userNeedsAccount) push('login')
  }

  render() {
    const { userNeedsAccount } = this.props
    if(userNeedsAccount) return null

    return (
      <div>
        <Header />
        <ScoresTableSection />
      </div>
    )
  }
}

export default connect( store => ({ userNeedsAccount: store.user.userNeedsAccount}), { push })(Dashboard)
