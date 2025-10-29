import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import TaskCard from '@/components/TaskCard.vue'
import type { Task } from '@/types'

describe('TaskCard.vue', () => {
  const vuetify = createVuetify({
    components,
    directives,
  })

  const mockTask: Task = {
    id: 'test-1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'todo'
  }

  it('renders task title', () => {
    const wrapper = mount(TaskCard, {
      props: { task: mockTask },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.text()).toContain('Test Task')
  })

  it('renders task description', () => {
    const wrapper = mount(TaskCard, {
      props: { task: mockTask },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.text()).toContain('Test Description')
  })

  it('renders task status', () => {
    const wrapper = mount(TaskCard, {
      props: { task: mockTask },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.text()).toContain('To Do')
  })

  it('applies hover class to card', () => {
    const wrapper = mount(TaskCard, {
      props: { task: mockTask },
      global: {
        plugins: [vuetify],
      },
    })

    const card = wrapper.find('.task-card')
    expect(card.exists()).toBe(true)
  })
})
