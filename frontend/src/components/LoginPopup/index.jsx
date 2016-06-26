import React from 'react'
import {connect} from 'react-redux'
import {Dialog, TextField, RaisedButton} from 'material-ui'

import Username from './Username'
import Password from './Password'
import RetypedPassword from './RetypedPassword'

class Popup extends React.Component{
  constructor(props){
    super(props)
    this.state = { popupOpen: true }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    this.setState({ popupOpen: false })
  }

  render() {
    const {store} = this.props

    const buttonDisabled = (store.username.error ||      // If none of the inputs
                            store.password.error ||      // is filed in a wrong way,
                            store.retypedPassword.error) // the button will not be disabled

    return(
      <Dialog
        title='Sign up in a second'
        modal={false}
        open={false/*this.state.popupOpen*/}
        titleClassName='login-modal-title'
        contentStyle={{ width: '40%' }}
      >
        <Username />
        <Password />
        <RetypedPassword />
        <RaisedButton label="Register me" primary={true} disabled={buttonDisabled} onClick={this.handleLogin} />
      </Dialog>
    )
  }
}

export default connect( (store) => ({ store: store.login }))(Popup)