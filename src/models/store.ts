declare interface Store {
  tasks: TasksReducer
}

declare interface TasksReducer {
  quickList: Tasks
  grassCatcher: Tasks
  completed: Tasks
}
