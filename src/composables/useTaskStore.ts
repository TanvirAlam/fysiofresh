import { ref, computed, readonly } from 'vue'
import type { Task, TaskStatus, NewTask } from '@/types'
import { generateId, TASK_COLUMNS, SAMPLE_TASKS } from '@/utils'

const tasks = ref<Task[]>([])
const columns = ref(TASK_COLUMNS)

export function useTaskStore() {

  const getTasksByStatus = (status: TaskStatus) => {
    return computed(() => tasks.value.filter(task => task.status === status))
  }

  const allTasks = computed(() => tasks.value)

  const getTaskCount = (status: TaskStatus) => {
    return computed(() => tasks.value.filter(task => task.status === status).length)
  }

  const addTask = (newTask: NewTask): Task => {
    const task: Task = {
      ...newTask,
      id: generateId('task')
    }
    tasks.value.push(task)
    return task
  }

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id'>>): Task | undefined => {
    const index = tasks.value.findIndex(task => task.id === id)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updates }
      return tasks.value[index]
    }
    return undefined
  }

  const deleteTask = (id: string): boolean => {
    const index = tasks.value.findIndex(task => task.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
      return true
    }
    return false
  }

  const moveTask = (id: string, newStatus: TaskStatus): Task | undefined => {
    return updateTask(id, { status: newStatus })
  }

  const getTaskById = (id: string): Task | undefined => {
    return tasks.value.find(task => task.id === id)
  }

  const clearAllTasks = (): void => {
    tasks.value = []
  }

  const initializeSampleData = (): void => {
    SAMPLE_TASKS.forEach(task => addTask(task))
  }

  return {
    tasks: readonly(tasks),
    columns: readonly(columns),
    allTasks,
    getTasksByStatus,
    getTaskCount,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTaskById,
    clearAllTasks,
    initializeSampleData
  }
}
