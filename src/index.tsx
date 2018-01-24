import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import App from './App'
import QuickList from './pages/QuickList'

import { store } from './store'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route path='/' component={QuickList} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root'),
)
