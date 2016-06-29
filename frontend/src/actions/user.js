import { createAction } from 'redux-act'


export const requestUserSignUp = createAction('REGISTER NEW USER')
export const receivedSignUpedUser = createAction('REGISTER NEW USER')
export const userSignUp = (name, password) => dispatch => {
  dispatch(requestUserSignUp())

  fetch()
}

