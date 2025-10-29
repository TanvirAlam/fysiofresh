<script setup lang="ts">
import type { Task, TaskStatus } from '@/types'
import { useTaskStore } from '@/composables/useTaskStore'
import KanbanColumn from './KanbanColumn.vue'
import './KanbanBoard.css'

interface Emits {
  (e: 'edit', task: Task): void
  (e: 'delete', taskId: string): void
}

const store = useTaskStore()
const emit = defineEmits<Emits>()

const handleDrop = (taskId: string, newStatus: TaskStatus) => {
  store.moveTask(taskId, newStatus)
}
</script>

<template>
  <v-container fluid class="kanban-board pa-6">
    <v-row class="ma-0" no-gutters>
      <v-col
        v-for="column in store.columns.value"
        :key="column.id"
        cols="12"
        sm="6"
        md="3"
        class="pa-2"
      >
        <kanban-column
          :column="column"
          :tasks="store.getTasksByStatus(column.id).value"
          @edit="emit('edit', $event)"
          @delete="emit('delete', $event)"
          @drop="handleDrop"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
