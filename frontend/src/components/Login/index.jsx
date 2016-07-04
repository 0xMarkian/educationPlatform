import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Dialog } from 'material-ui'

class Login extends Component {
  handleLogin(){
    
  }
  render() {
    return (
      <Dialog
        title='Login a second'
        open={true}
        titleClassName='login-modal-title'
        contentStyle={{ width: '40%' }}
      >
        hi
      </Dialog>
    )
  }
}
export default Login
