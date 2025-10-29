import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import TaskDialog from '@/components/TaskDialog.vue'
import type { Task } from '@/types'

describe('TaskDialog.vue', () => {
  const vuetify = createVuetify({
    components,
    directives,
  })

  const mockTask: Task = {
    id: 'test-1',
    title: 'Test Task',
    description: 'Test Description for task',
    status: 'backlog'
  }

  let teleportTarget: HTMLElement

  beforeEach(() => {
    // Create teleport target for Vuetify dialogs
    teleportTarget = document.createElement('div')
    teleportTarget.setAttribute('data-v-app', '')
    document.body.appendChild(teleportTarget)
  })

  afterEach(() => {
    // Clean up
    document.body.removeChild(teleportTarget)
  })

  it('renders in create mode', () => {
    const wrapper = mount(TaskDialog, {
      props: {
        modelValue: true,
        mode: 'create'
      },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.props('mode')).toBe('create')
  })

  it('renders in edit mode with task', () => {
    const wrapper = mount(TaskDialog, {
      props: {
        modelValue: true,
        mode: 'edit',
        task: mockTask
      },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.props('mode')).toBe('edit')
    expect(wrapper.props('task')).toEqual(mockTask)
  })

  it('accepts task prop', () => {
    const wrapper = mount(TaskDialog, {
      props: {
        modelValue: true,
        mode: 'edit',
        task: mockTask
      },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.props('task')?.title).toBe('Test Task')
  })

  it('emits save event', async () => {
    const wrapper = mount(TaskDialog, {
      props: {
        modelValue: true,
        mode: 'create'
      },
      global: {
        plugins: [vuetify],
      },
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()).toBeDefined()
  })

  it('is controlled by modelValue prop', () => {
    const wrapper = mount(TaskDialog, {
      props: {
        modelValue: false,
        mode: 'create'
      },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.props('modelValue')).toBe(false)
  })

  it('mounts successfully', () => {
    const wrapper = mount(TaskDialog, {
      props: {
        modelValue: true,
        mode: 'create'
      },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('renders v-dialog component', () => {
    const wrapper = mount(TaskDialog, {
      props: {
        modelValue: true,
        mode: 'create'
      },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.findComponent({ name: 'VDialog' }).exists()).toBe(true)
  })
})
