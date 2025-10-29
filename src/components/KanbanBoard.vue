<script setup lang="ts">
import type { Task, TaskStatus } from '@/types'
import { useTaskStore } from '@/composables/useTaskStore'
import KanbanColumn from './KanbanColumn.vue'

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
        md="4"
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

<style scoped>
.kanban-board {
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  min-height: calc(100vh - 64px);
}

.kanban-board .v-row {
  height: 100%;
}

/* Responsive adjustments */
@media (max-width: 959px) {
  .kanban-board {
    padding: 16px !important;
  }
}

@media (max-width: 599px) {
  .kanban-board {
    padding: 12px !important;
  }
}
</style>
