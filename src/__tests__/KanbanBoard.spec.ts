import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import KanbanBoard from '@/components/KanbanBoard.vue'
import { useTaskStore } from '@/composables/useTaskStore'

describe('KanbanBoard.vue', () => {
  const vuetify = createVuetify({
    components,
    directives,
  })

  let store: ReturnType<typeof useTaskStore>

  beforeEach(() => {
    store = useTaskStore()
    store.clearAllTasks()
  })

  it('renders three columns', () => {
    const wrapper = mount(KanbanBoard, {
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.text()).toContain('To Do')
    expect(wrapper.text()).toContain('In Progress')
    expect(wrapper.text()).toContain('Done')
  })

  it('displays tasks in correct columns', () => {
    store.addTask({ title: 'Todo Task', description: 'Test', status: 'todo' })
    store.addTask({ title: 'In Progress Task', description: 'Test', status: 'in-progress' })
    store.addTask({ title: 'Done Task', description: 'Test', status: 'done' })

    const wrapper = mount(KanbanBoard, {
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.text()).toContain('Todo Task')
    expect(wrapper.text()).toContain('In Progress Task')
    expect(wrapper.text()).toContain('Done Task')
  })

  it('updates when tasks are added', async () => {
    const wrapper = mount(KanbanBoard, {
      global: {
        plugins: [vuetify],
      },
    })

    // Initially no tasks
    expect(wrapper.text()).toContain('No tasks')

    // Add a task
    store.addTask({ title: 'New Task', description: 'Test', status: 'todo' })

    // Wait for reactivity
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('New Task')
  })
})
