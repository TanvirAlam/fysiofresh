import type { NewTask } from '@/types'

export const SAMPLE_TASKS: NewTask[] = [
  {
    title: 'Design database schema',
    description: 'Create the initial database design for the project',
    status: 'backlog'
  },
  {
    title: 'Setup project repository',
    description: 'Initialize Git repo and configure CI/CD',
    status: 'backlog'
  },
  {
    title: 'Build API endpoints',
    description: 'Implement RESTful API for task management',
    status: 'doing'
  },
  {
    title: 'Create UI components',
    description: 'Design and implement reusable Vue components',
    status: 'review'
  },
  {
    title: 'Write unit tests',
    description: 'Add comprehensive test coverage',
    status: 'review'
  },
  {
    title: 'Setup development environment',
    description: 'Configure local dev tools and dependencies',
    status: 'done'
  },
  {
    title: 'Documentation',
    description: 'Write project documentation and README',
    status: 'done'
  },
  {
    title: 'Code review process',
    description: 'Establish code review guidelines',
    status: 'done'
  }
]
