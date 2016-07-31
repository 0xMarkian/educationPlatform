import { createAction } from 'redux-act'

import { backendAdress, defaultFetchParams } from '../config'
import { parseJSON, displayMessageAndHandleResponse } from '../utils'

export const showMessage = createAction('SHOW MESSAGE')
export const hideMessage = createAction('HIDE MESSAGE')
