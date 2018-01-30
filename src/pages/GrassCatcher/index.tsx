import React from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'

import TaskList from '../TaskList'
import { selectGrassCatcherTasks } from '../../selectors/tasks'
import { fetchGrassCatcherTasks, completeTask, moveToQuickList, deleteTask } from '../../thunks/tasks'

const mapStateToProps = (state: Store) => ({
  tasks: selectGrassCatcherTasks(state),
})
const mapStateToPropsType = returntypeof(mapStateToProps)
type StateProps = typeof mapStateToPropsType

const mapDispatchToProps = {
  fetchGrassCatcherTasks,
  completeTask,
  moveToQuickList,
  deleteTask,
}
type DispatchProps = typeof mapDispatchToProps

interface OwnProps {
  children: React.ReactNode
}
type Props = StateProps & DispatchProps & OwnProps

class GrassCatcher extends React.Component<Props> {
  public render () {
    return (
      <TaskList tasks={this.props.tasks} onCompleteTask={this.onCompleteTask} onMoveToQuickList={this.onMoveToQuickList} onDelete={this.onDelete} />
    )
  }

  private onCompleteTask = (task: Task) => {
    this.props.completeTask(task.id)
  }

  private onMoveToQuickList = (task: Task) => {
    this.props.moveToQuickList(task.id)
  }

  private onDelete = (task: Task) => {
    this.props.deleteTask(task.id)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GrassCatcher)
