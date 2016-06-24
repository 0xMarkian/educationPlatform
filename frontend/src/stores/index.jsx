const stores = {
  login: {
    username: {
      value: null,
      error: true,
      errorText: null
    },
    password: {
      value: null,
      error: true,
      errorText: null
    },
    retypedPassword: {
      value: null,
      error: true,
      errorText: null
    }
  },
  workspace: {
    curatorId: null,
    newGroupPopup: {
     popupOpen: false,
     groupName: {
        error: true,
       errorText: null
     }
    }
  }
}

export default stores