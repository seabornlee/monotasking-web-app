import axios, { AxiosResponse } from 'axios'
import { fetchQuickListTasksSucceeded, fetchGrassCatcherTasksSucceeded, fetchCompletedTasksSucceeded } from '../actions/tasks'

export const fetchQuickListTasks = () => {
  return (dispatch, getState) => {
    axios.get('tasks/quick-list').then((response: AxiosResponse<Tasks>) => {
      dispatch(fetchQuickListTasksSucceeded(response.data))
    })
  }
}

export const fetchGrassCatcherTasks = () => {
  return (dispatch, getState) => {
    axios.get('tasks/grass-catcher').then((response) => {
      dispatch(fetchGrassCatcherTasksSucceeded(response.data))
    })
  }
}

export const fetchCompletedTasks = () => {
  return (dispatch, getState) => {
    axios.get('tasks/completed').then((response) => {
      dispatch(fetchCompletedTasksSucceeded(response.data))
    })
  }
}
