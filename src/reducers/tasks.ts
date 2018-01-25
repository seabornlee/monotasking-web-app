import { handleActions } from 'redux-actions'
import { ACTION_TYPES } from '../actions/types'

export const initialState: TasksReducer = {
  quickList: [],
  grassCatcher: [],
  completed: [],
}

export const tasksReducer = handleActions<TasksReducer, Tasks>({
  [ACTION_TYPES.FETCH_QUICK_LIST_TASKS_SUCCEEDED]: (state: TasksReducer, action: ReduxActions.Action<Tasks>) => ({
    ...state,
    quickList: action.payload,
  }),
  [ACTION_TYPES.FETCH_GRASS_CATCHER_TASKS_SUCCEEDED]: (state: TasksReducer, action: ReduxActions.Action<Tasks>) => ({
    ...state,
    grassCatcher: action.payload,
  }),
  [ACTION_TYPES.FETCH_COMPLETED_TASKS_SUCCEEDED]: (state: TasksReducer, action: ReduxActions.Action<Tasks>) => ({
    ...state,
    completed: action.payload,
  }),
}, initialState)
