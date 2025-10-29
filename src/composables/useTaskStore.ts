import { ref, computed, readonly } from 'vue'
import type { Task, TaskStatus, Column, NewTask } from '@/types'

// Singleton state - shared across all component instances
const tasks = ref<Task[]>([])

const columns = ref<Column[]>([
  { id: 'todo', title: 'To Do', color: 'blue' },
  { id: 'in-progress', title: 'In Progress', color: 'orange' },
  { id: 'done', title: 'Done', color: 'green' }
])

export function useTaskStore() {
  // Generate unique ID for tasks
  const generateId = (): string => {
    return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Computed: Get tasks by status
  const getTasksByStatus = (status: TaskStatus) => {
    return computed(() => tasks.value.filter(task => task.status === status))
  }

  // Computed: Get all tasks
  const allTasks = computed(() => tasks.value)

  // Computed: Get task count by status
  const getTaskCount = (status: TaskStatus) => {
    return computed(() => tasks.value.filter(task => task.status === status).length)
  }

  // CRUD: Add a new task
  const addTask = (newTask: NewTask): Task => {
    const task: Task = {
      ...newTask,
      id: generateId()
    }
    tasks.value.push(task)
    return task
  }

  // CRUD: Update an existing task
  const updateTask = (id: string, updates: Partial<Omit<Task, 'id'>>): Task | undefined => {
    const index = tasks.value.findIndex(task => task.id === id)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updates }
      return tasks.value[index]
    }
    return undefined
  }

  // CRUD: Delete a task
  const deleteTask = (id: string): boolean => {
    const index = tasks.value.findIndex(task => task.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
      return true
    }
    return false
  }

  // Move task to a different status
  const moveTask = (id: string, newStatus: TaskStatus): Task | undefined => {
    return updateTask(id, { status: newStatus })
  }

  // Get a single task by ID
  const getTaskById = (id: string): Task | undefined => {
    return tasks.value.find(task => task.id === id)
  }

  // Clear all tasks
  const clearAllTasks = (): void => {
    tasks.value = []
  }

  // Initialize with sample data (for testing)
  const initializeSampleData = (): void => {
    const sampleTasks: NewTask[] = [
      {
        title: 'Design database schema',
        description: 'Create the initial database design for the project',
        status: 'done'
      },
      {
        title: 'Build API endpoints',
        description: 'Implement RESTful API for task management',
        status: 'in-progress'
      },
      {
        title: 'Write unit tests',
        description: 'Add comprehensive test coverage',
        status: 'todo'
      }
    ]

    sampleTasks.forEach(task => addTask(task))
  }

  return {
    // State (readonly to prevent direct mutation)
    tasks: readonly(tasks),
    columns: readonly(columns),
    
    // Computed
    allTasks,
    getTasksByStatus,
    getTaskCount,
    
    // Methods
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTaskById,
    clearAllTasks,
    initializeSampleData
  }
}
