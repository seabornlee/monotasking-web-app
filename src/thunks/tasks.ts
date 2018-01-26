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

export const completeTask = (taskId: number) => {
  return (dispatch, getState) => {
    axios.post(`tasks/${taskId}/complete`).then((response) => {
      dispatch(fetchQuickListTasks())
      dispatch(fetchGrassCatcherTasks())
      dispatch(fetchCompletedTasks())
    })
  }
}

export const moveToGrassCatcher = (taskId: number) => {
  return (dispatch, getState) => {
    axios.post(`tasks/${taskId}/move-to-grass-catcher`).then((response) => {
      dispatch(fetchQuickListTasks())
      dispatch(fetchGrassCatcherTasks())
    })
  }
}

export const moveToQuickList = (taskId: number) => {
  return (dispatch, getState) => {
    axios.post(`tasks/${taskId}/move-to-quick`).then((response) => {
      dispatch(fetchQuickListTasks())
      dispatch(fetchGrassCatcherTasks())
    })
  }
}

export const deleteTask = (taskId: number) => {
  return (dispatch, getState) => {
    axios.delete(`tasks/${taskId}`).then((response) => {
      dispatch(fetchQuickListTasks())
      dispatch(fetchGrassCatcherTasks())
      dispatch(fetchCompletedTasks())
    })
  }
}
