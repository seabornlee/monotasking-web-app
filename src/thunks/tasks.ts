import axios from 'axios'

export const fetchQuickListTasks = () => {
  return (dispatch, getState) => {
    axios.get('tasks/quick-list').then((response) => {
      console.log(response)
    })
  }
}

export const fetchGrassCatcherTasks = () => {
  return (dispatch, getState) => {
    axios.get('tasks/grass-catcher').then((response) => {
      console.log(response)
    })
  }
}

export const fetchCompletedTasks = () => {
  return (dispatch, getState) => {
    axios.get('tasks/completed').then((response) => {
      console.log(response)
    })
  }
}
