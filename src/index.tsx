import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { store } from './store'
import App from './pages/App'

import './assets/icons/iconfont.css'
import './styles/index.scss'

axios.defaults.baseURL = '/v1'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Redirect exact={true} path='/' to='/quick-list' />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)
