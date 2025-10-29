export type TaskStatus = 'todo' | 'in-progress' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
}

export interface Column {
  id: TaskStatus
  title: string
  color: string
}

export type NewTask = Omit<Task, 'id'>
