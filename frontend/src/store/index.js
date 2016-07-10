import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'

import history from 'appHistory'
import rootReducer from '../reducers'


export default (initialState) => {
  const reduxRouterMiddleWare = routerMiddleware(history)

  const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware, reduxRouterMiddleWare),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)

  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
