import React from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'

import TaskList from '../TaskList'
import { selectGrassCatcherTasks } from '../../selectors/tasks'
import { fetchGrassCatcherTasks } from '../../thunks/tasks'

const mapStateToProps = (state) => ({
  tasks: selectGrassCatcherTasks(state),
})
const mapStateToPropsType = returntypeof(mapStateToProps)
type StateProps = typeof mapStateToPropsType

const mapDispatchToProps = {
  fetchGrassCatcherTasks,
}
type DispatchProps = typeof mapDispatchToProps

interface OwnProps {
  children: React.ReactNode
}
type Props = StateProps & DispatchProps & OwnProps

class GrassCatcher extends React.Component<Props> {
  public render () {
    return (
      <TaskList tasks={this.props.tasks}/>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GrassCatcher)
