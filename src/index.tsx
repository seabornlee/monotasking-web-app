import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { store } from './store'
import App from './pages/App'
import { QuickList } from './pages/QuickList'
import { GrassCatcher } from './pages/GrassCatcher'
import { Completed } from './pages/Completed'

import './assets/icons/icons.css'
import './styles/index.scss'

axios.defaults.baseURL = '/v1'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Redirect exact={true} path='/' to='/quick-list' />
          <Route path='/quick-list' component={QuickList} />
          <Route path='/grass-catcher' component={GrassCatcher} />
          <Route path='/completed' component={Completed} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root'),
)
