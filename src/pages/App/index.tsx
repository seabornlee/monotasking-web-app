import React from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'
import { withRouter, Switch, Route } from 'react-router-dom'

import { Tabs } from '../Tabs'
import { Button } from '../../components/Button'
import { fetchQuickListTasks, fetchGrassCatcherTasks, fetchCompletedTasks } from '../../thunks/tasks'

import QuickList from '../QuickList'
import GrassCatcher from '../GrassCatcher'
import Completed from '../Completed'

import './index.scss'

const logo = require('../../assets/images/mono-logo-black.png')

const mapStateToProps = (state) => ({
})
const mapStateToPropsType = returntypeof(mapStateToProps)
type StateProps = typeof mapStateToPropsType

const mapDispatchToProps = {
  fetchQuickListTasks,
  fetchGrassCatcherTasks,
  fetchCompletedTasks,
}
type DispatchProps = typeof mapDispatchToProps

interface OwnProps {
  children: React.ReactNode
}
type Props = StateProps & DispatchProps & OwnProps

class App extends React.Component<Props> {
  public componentDidMount () {
    this.props.fetchQuickListTasks()
    this.props.fetchGrassCatcherTasks()
    this.props.fetchCompletedTasks()
  }

  public render () {
    return (
      <div className='app-container'>
        <header>
          <img src={logo} alt='MonoToday'/>
        </header>
        <div className='new-task'>
          <input className='new-task-input' type='text' placeholder='添加 #接下来最应该开始的工作#'/>
          <Button type='primary' className='new-task-btn'><i className='iconfont icon-enter' /></Button>
        </div>

        <Switch>
          <Route exact={true} path='/quick-list' component={QuickList} />
          <Route exact={true} path='/grass-catcher' component={GrassCatcher} />
          <Route exact={true} path='/completed' component={Completed} />
        </Switch>

        <Tabs />

        <Button type='primary' className='start-mono-btn'>开始单核</Button>
        <footer>
          <a href='https://baike.baidu.com/item/%E5%8D%95%E6%A0%B8%E5%B7%A5%E4%BD%9C%E6%B3%95/22119461?fr=aladdin'>什么是单核工作法？</a>
        </footer>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App) as any)
