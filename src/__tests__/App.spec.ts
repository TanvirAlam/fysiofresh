import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from '../App.vue'

describe('App.vue', () => {
  it('renders properly', () => {
    const vuetify = createVuetify({
      components,
      directives,
    })

    const wrapper = mount(App, {
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.text()).toContain('Welcome to Fysiofresh Kanban Board')
  })
})
