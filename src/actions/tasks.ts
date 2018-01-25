import { createAction } from 'redux-actions'
import { ACTION_TYPES } from './types'

export const fetchQuickListTasksSucceeded = createAction(
  ACTION_TYPES.FETCH_QUICK_LIST_TASKS_SUCCEEDED,
  (payload: Tasks) => payload,
)

export const fetchGrassCatcherTasksSucceeded = createAction(
  ACTION_TYPES.FETCH_GRASS_CATCHER_TASKS_SUCCEEDED,
  (payload: Tasks) => payload,
)

export const fetchCompletedTasksSucceeded = createAction(
  ACTION_TYPES.FETCH_COMPLETED_TASKS_SUCCEEDED,
  (payload: Tasks) => payload,
)
