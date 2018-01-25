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
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default TaskList
