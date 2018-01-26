import React from 'react'

import './index.scss'

interface Props {
  tasks: Tasks
  onCompleteTask?: (task: Task) => void
  onMoveToGrassCatcher?: (task: Task) => void
  onMoveToQuickList?: (task: Task) => void
  onDelete?: (task: Task) => void
}

class TaskList extends React.Component<Props> {
  public render () {
    return (
      <ul className='task-list'>
        {this.props.tasks.map((task: Task) => this.renderTask(task))}
      </ul>
    )
  }

  private renderTask = (task: Task) => {
    return (
      <li key={task.id}>
        {this.isCompleted(task) ? <i className='iconfont icon-roundcheck' /> : ''}
        <span className='task-title'>{task.title}</span>
        <div className='actions'>
          {!this.isCompleted(task) ? <i onClick={this.onCompleteTask(task)} className='iconfont icon-roundcheck' /> : ''}
          {this.isInGrassCatcher(task) ? <i onClick={this.onMoveToQuickList(task)} className='iconfont icon-pullleft' /> : ''}
          {this.isInQuickList(task) ? <i onClick={this.onMoveToGrassCatcher(task)} className='iconfont icon-pullright' /> : ''}
          <i onClick={this.onDelete(task)} className='iconfont icon-delete' />
        </div>
      </li>
    )
  }

  private isInQuickList = (task: Task) => {
    return task.queue === 'quick' && task.completed_at === null
  }

  private isInGrassCatcher = (task: Task) => {
    return task.queue === 'grass_catcher' && task.completed_at === null
  }

  private isCompleted = (task: Task) => {
    return task.completed_at !== null
  }

  private onCompleteTask = (task: Task) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    this.props.onCompleteTask && this.props.onCompleteTask(task)
  }

  private onMoveToGrassCatcher = (task: Task) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    this.props.onMoveToGrassCatcher && this.props.onMoveToGrassCatcher(task)
  }

  private onMoveToQuickList = (task: Task) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    this.props.onMoveToQuickList && this.props.onMoveToQuickList(task)
  }

  private onDelete = (task: Task) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    this.props.onDelete && this.props.onDelete(task)
  }
}

export default TaskList
