import React from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'

import TaskList from '../TaskList'
import { selectCompletedTasks } from '../../selectors/tasks'
import { fetchCompletedTasks, deleteTask } from '../../thunks/tasks'

const mapStateToProps = (state: Store) => ({
  tasks: selectCompletedTasks(state),
})
const mapStateToPropsType = returntypeof(mapStateToProps)
type StateProps = typeof mapStateToPropsType

const mapDispatchToProps = {
  fetchCompletedTasks,
  deleteTask,
}
type DispatchProps = typeof mapDispatchToProps

interface OwnProps {
  children: React.ReactNode
}
type Props = StateProps & DispatchProps & OwnProps

class Completed extends React.Component<Props> {
  public render () {
    return (
      <TaskList tasks={this.props.tasks} onDelete={this.onDelete} />
    )
  }

  private onDelete = (task: Task) => {
    this.props.deleteTask(task.id)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Completed)
