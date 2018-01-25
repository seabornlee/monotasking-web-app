import React from 'react'

import './index.scss'

interface Props {
  tasks: Tasks
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
        {
          this.isCompleted(task) ? <i className='iconfont icon-roundcheck' /> : ''
        }
        <span className='task-title'>{task.title}</span>
        <div className='actions'>
          {
            !this.isCompleted(task) ? <i className='iconfont icon-roundcheck' /> : ''
          }
          {
            this.isInGrassCatcher(task) ? <i className='iconfont icon-pullleft' /> : ''
          }
          {
            this.isInQuickList(task) ? <i className='iconfont icon-pullright' /> : ''
          }
          <i className='iconfont icon-delete' />
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
}

export default TaskList
