import createBrowserHistory from 'history/lib/createBrowserHistory'
import { useBasename } from 'history'

import { useRouterHistory } from 'react-router'


export default useBasename(
  // creating history
  useRouterHistory(createBrowserHistory)
)({ basename: '/', queries: false })
