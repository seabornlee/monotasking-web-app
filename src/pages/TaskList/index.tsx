import React from 'react'

import './index.scss'

interface Props {
  tasks: Tasks
}

class TaskList extends React.Component<Props> {
  public render () {
    return (
      <ul className='task-list'>
        {
          this.props.tasks.map((task: Task) => {
            return (
              <li key={task.id}>
                <span className='task-title'>{task.title}</span>
                <div className='actions'>
                  <i className='iconfont icon-roundcheck' />
                  <i className='iconfont icon-pullleft' />
                  <i className='iconfont icon-pullright' />
                  <i className='iconfont icon-delete' />
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default TaskList
