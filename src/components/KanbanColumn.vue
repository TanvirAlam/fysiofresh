<script setup lang="ts">
import { computed } from 'vue'
import type { Column, Task } from '@/types'
import TaskCard from './TaskCard.vue'

interface Props {
  column: Column
  tasks: Task[]
}

interface Emits {
  (e: 'edit', task: Task): void
  (e: 'delete', taskId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const taskCount = computed(() => props.tasks.length)
</script>

<template>
  <v-card class="kanban-column" elevation="0" color="grey-lighten-4">
    <v-card-title class="d-flex align-center justify-space-between pa-4">
      <div class="d-flex align-center">
        <v-icon :color="column.color" class="mr-2">mdi-circle</v-icon>
        <span class="text-h6">{{ column.title }}</span>
      </div>
      <v-chip :color="column.color" size="small">
        {{ taskCount }}
      </v-chip>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text class="pa-3" style="min-height: 400px; max-height: calc(100vh - 280px); overflow-y: auto;">
      <div v-if="tasks.length === 0" class="text-center text-medium-emphasis py-8">
        <v-icon size="48" color="grey-lighten-1">mdi-inbox</v-icon>
        <p class="mt-2">No tasks</p>
      </div>
      
      <task-card
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="emit('edit', $event)"
        @delete="emit('delete', $event)"
      />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.kanban-column {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.kanban-column .v-card-text {
  flex: 1;
  overflow-y: auto;
}

/* Custom scrollbar styling */
.kanban-column .v-card-text::-webkit-scrollbar {
  width: 8px;
}

.kanban-column .v-card-text::-webkit-scrollbar-track {
  background: transparent;
}

.kanban-column .v-card-text::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.kanban-column .v-card-text::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}
</style>
