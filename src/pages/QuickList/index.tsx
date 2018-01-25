import React from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'

import TaskList from '../TaskList'
import { fetchQuickListTasks } from '../../thunks/tasks'
import { selectQuickListTasks } from '../../selectors/tasks'

const mapStateToProps = (state) => ({
  tasks: selectQuickListTasks(state),
})
const mapStateToPropsType = returntypeof(mapStateToProps)
type StateProps = typeof mapStateToPropsType

const mapDispatchToProps = {
  fetchQuickListTasks,
}
type DispatchProps = typeof mapDispatchToProps

interface OwnProps {
  children: React.ReactNode
}
type Props = StateProps & DispatchProps & OwnProps

class QuickList extends React.Component<Props> {
  public componentDidMount () {
    this.props.fetchQuickListTasks()
  }

  public render () {
    return (
      <TaskList tasks={this.props.tasks}/>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickList)
