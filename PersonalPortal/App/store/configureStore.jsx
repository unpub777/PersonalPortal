import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/rootReducer.jsx'
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}