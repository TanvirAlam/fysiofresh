import { describe, it, expect, beforeEach } from 'vitest'
import { useTaskStore } from '@/composables/useTaskStore'
import type { NewTask } from '@/types'

describe('useTaskStore', () => {
  let store: ReturnType<typeof useTaskStore>

  beforeEach(() => {
    store = useTaskStore()
    store.clearAllTasks()
  })

  describe('Initial State', () => {
    it('should start with empty tasks', () => {
      expect(store.allTasks.value).toEqual([])
    })

    it('should have three columns defined', () => {
      expect(store.columns.value).toHaveLength(3)
      expect(store.columns.value[0].id).toBe('todo')
      expect(store.columns.value[1].id).toBe('in-progress')
      expect(store.columns.value[2].id).toBe('done')
    })
  })

  describe('addTask', () => {
    it('should add a new task with generated id', () => {
      const newTask: NewTask = {
        title: 'Test Task',
        description: 'Test Description',
        status: 'todo'
      }

      const addedTask = store.addTask(newTask)

      expect(addedTask.id).toBeDefined()
      expect(addedTask.title).toBe(newTask.title)
      expect(addedTask.description).toBe(newTask.description)
      expect(addedTask.status).toBe(newTask.status)
      expect(store.allTasks.value).toHaveLength(1)
    })

    it('should generate unique IDs for multiple tasks', () => {
      const task1 = store.addTask({ title: 'Task 1', description: 'Desc 1', status: 'todo' })
      const task2 = store.addTask({ title: 'Task 2', description: 'Desc 2', status: 'todo' })

      expect(task1.id).not.toBe(task2.id)
    })
  })

  describe('updateTask', () => {
    it('should update an existing task', () => {
      const task = store.addTask({ title: 'Original', description: 'Desc', status: 'todo' })

      const updated = store.updateTask(task.id, { title: 'Updated' })

      expect(updated?.title).toBe('Updated')
      expect(updated?.description).toBe('Desc')
      expect(updated?.id).toBe(task.id)
    })

    it('should return undefined for non-existent task', () => {
      const result = store.updateTask('non-existent-id', { title: 'Test' })
      expect(result).toBeUndefined()
    })

    it('should update multiple properties at once', () => {
      const task = store.addTask({ title: 'Original', description: 'Desc', status: 'todo' })

      const updated = store.updateTask(task.id, {
        title: 'New Title',
        description: 'New Description',
        status: 'done'
      })

      expect(updated?.title).toBe('New Title')
      expect(updated?.description).toBe('New Description')
      expect(updated?.status).toBe('done')
    })
  })

  describe('deleteTask', () => {
    it('should delete an existing task', () => {
      const task = store.addTask({ title: 'To Delete', description: 'Desc', status: 'todo' })

      const result = store.deleteTask(task.id)

      expect(result).toBe(true)
      expect(store.allTasks.value).toHaveLength(0)
    })

    it('should return false for non-existent task', () => {
      const result = store.deleteTask('non-existent-id')
      expect(result).toBe(false)
    })

    it('should only delete the specified task', () => {
      const task1 = store.addTask({ title: 'Task 1', description: 'Desc 1', status: 'todo' })
      const task2 = store.addTask({ title: 'Task 2', description: 'Desc 2', status: 'todo' })

      store.deleteTask(task1.id)

      expect(store.allTasks.value).toHaveLength(1)
      expect(store.allTasks.value[0].id).toBe(task2.id)
    })
  })

  describe('moveTask', () => {
    it('should move a task to a different status', () => {
      const task = store.addTask({ title: 'Task', description: 'Desc', status: 'todo' })

      const moved = store.moveTask(task.id, 'in-progress')

      expect(moved?.status).toBe('in-progress')
    })

    it('should return undefined for non-existent task', () => {
      const result = store.moveTask('non-existent-id', 'done')
      expect(result).toBeUndefined()
    })
  })

  describe('getTaskById', () => {
    it('should return task with matching id', () => {
      const task = store.addTask({ title: 'Task', description: 'Desc', status: 'todo' })

      const found = store.getTaskById(task.id)

      expect(found).toBeDefined()
      expect(found?.id).toBe(task.id)
    })

    it('should return undefined for non-existent id', () => {
      const found = store.getTaskById('non-existent-id')
      expect(found).toBeUndefined()
    })
  })

  describe('getTasksByStatus', () => {
    beforeEach(() => {
      store.addTask({ title: 'Todo 1', description: 'Desc', status: 'todo' })
      store.addTask({ title: 'Todo 2', description: 'Desc', status: 'todo' })
      store.addTask({ title: 'In Progress', description: 'Desc', status: 'in-progress' })
      store.addTask({ title: 'Done', description: 'Desc', status: 'done' })
    })

    it('should return tasks with matching status', () => {
      const todoTasks = store.getTasksByStatus('todo')
      expect(todoTasks.value).toHaveLength(2)
    })

    it('should return empty array for status with no tasks', () => {
      store.clearAllTasks()
      const tasks = store.getTasksByStatus('todo')
      expect(tasks.value).toHaveLength(0)
    })

    it('should reactively update when tasks change', () => {
      const todoTasks = store.getTasksByStatus('todo')
      const initialLength = todoTasks.value.length

      store.addTask({ title: 'New Todo', description: 'Desc', status: 'todo' })

      expect(todoTasks.value).toHaveLength(initialLength + 1)
    })
  })

  describe('getTaskCount', () => {
    beforeEach(() => {
      store.addTask({ title: 'Todo 1', description: 'Desc', status: 'todo' })
      store.addTask({ title: 'Todo 2', description: 'Desc', status: 'todo' })
      store.addTask({ title: 'In Progress', description: 'Desc', status: 'in-progress' })
    })

    it('should return correct count for each status', () => {
      expect(store.getTaskCount('todo').value).toBe(2)
      expect(store.getTaskCount('in-progress').value).toBe(1)
      expect(store.getTaskCount('done').value).toBe(0)
    })

    it('should reactively update when tasks are added', () => {
      const todoCount = store.getTaskCount('todo')
      const initialCount = todoCount.value

      store.addTask({ title: 'New Todo', description: 'Desc', status: 'todo' })

      expect(todoCount.value).toBe(initialCount + 1)
    })
  })

  describe('clearAllTasks', () => {
    it('should remove all tasks', () => {
      store.addTask({ title: 'Task 1', description: 'Desc', status: 'todo' })
      store.addTask({ title: 'Task 2', description: 'Desc', status: 'in-progress' })

      store.clearAllTasks()

      expect(store.allTasks.value).toHaveLength(0)
    })
  })

  describe('initializeSampleData', () => {
    it('should add sample tasks', () => {
      store.initializeSampleData()

      expect(store.allTasks.value.length).toBeGreaterThan(0)
      expect(store.getTaskCount('todo').value).toBeGreaterThan(0)
      expect(store.getTaskCount('in-progress').value).toBeGreaterThan(0)
      expect(store.getTaskCount('done').value).toBeGreaterThan(0)
    })
  })

  describe('Store Singleton Behavior', () => {
    it('should share state across multiple store instances', () => {
      const store1 = useTaskStore()
      const store2 = useTaskStore()

      store1.addTask({ title: 'Shared Task', description: 'Desc', status: 'todo' })

      expect(store2.allTasks.value).toHaveLength(1)
      expect(store2.allTasks.value[0].title).toBe('Shared Task')
    })
  })
})
