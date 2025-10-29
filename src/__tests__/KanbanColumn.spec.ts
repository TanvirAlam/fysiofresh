import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import KanbanColumn from '@/components/KanbanColumn.vue'
import type { Column, Task } from '@/types'

describe('KanbanColumn.vue', () => {
  const vuetify = createVuetify({
    components,
    directives,
  })

  const mockColumn: Column = {
    id: 'backlog',
    title: 'To Do',
    color: 'blue'
  }

  const mockTasks: Task[] = [
    {
      id: 'test-1',
      title: 'Task 1',
      description: 'Description 1',
      status: 'backlog'
    },
    {
      id: 'test-2',
      title: 'Task 2',
      description: 'Description 2',
      status: 'backlog'
    }
  ]

  it('renders column title', () => {
    const wrapper = mount(KanbanColumn, {
      props: {
        column: mockColumn,
        tasks: []
      },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.text()).toContain('To Do')
  })

  it('displays correct task count', () => {
    const wrapper = mount(KanbanColumn, {
      props: {
        column: mockColumn,
        tasks: mockTasks
      },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.text()).toContain('2')
  })

  it('renders all task cards', () => {
    const wrapper = mount(KanbanColumn, {
      props: {
        column: mockColumn,
        tasks: mockTasks
      },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.text()).toContain('Task 1')
    expect(wrapper.text()).toContain('Task 2')
  })

  it('shows empty state when no tasks', () => {
    const wrapper = mount(KanbanColumn, {
      props: {
        column: mockColumn,
        tasks: []
      },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.text()).toContain('No tasks')
  })
})
