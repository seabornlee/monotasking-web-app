import { handleActions } from 'redux-actions'

export const initialState = {
}

export const tasksReducer = handleActions({
  ['test']: (state, action) => state,
}, initialState)
