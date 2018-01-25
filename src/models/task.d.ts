declare interface Task {
  id: number
  queue: string
  title: string
  completed_at: string
}

declare type Tasks = Task[]
