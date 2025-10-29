import type { Column } from '@/types'

export const TASK_COLUMNS: Column[] = [
  { id: 'backlog', title: 'Backlog', color: '#FF9AA2' },
  { id: 'doing', title: 'Doing', color: '#FFE19C' },
  { id: 'review', title: 'Review', color: '#B5EAD7' },
  { id: 'done', title: 'Done', color: '#C7CEEA' }
]

export const COLUMN_COLORS: Record<string, string> = {
  backlog: '#FF9AA2',
  doing: '#FFE19C',
  review: '#B5EAD7',
  done: '#C7CEEA'
}
