import React from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'

import TaskList from '../TaskList'
import { selectCompletedTasks } from '../../selectors/tasks'
import { fetchCompletedTasks } from '../../thunks/tasks'

const mapStateToProps = (state) => ({
  tasks: selectCompletedTasks(state),
})
const mapStateToPropsType = returntypeof(mapStateToProps)
type StateProps = typeof mapStateToPropsType

const mapDispatchToProps = {
  fetchCompletedTasks,
}
type DispatchProps = typeof mapDispatchToProps

interface OwnProps {
  children: React.ReactNode
}
type Props = StateProps & DispatchProps & OwnProps

class Cpmpleted extends React.Component<Props> {
  public render () {
    return (
      <TaskList tasks={this.props.tasks}/>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cpmpleted)
