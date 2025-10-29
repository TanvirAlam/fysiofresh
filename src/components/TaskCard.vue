<script setup lang="ts">
import type { Task } from '@/types'

interface Props {
  task: Task
}

interface Emits {
  (e: 'edit', task: Task): void
  (e: 'delete', taskId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleEdit = () => {
  emit('edit', props.task)
}

const handleDelete = () => {
  emit('delete', props.task.id)
}

// Drag and drop handlers
const handleDragStart = (event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('taskId', props.task.id)
    event.dataTransfer.setData('taskStatus', props.task.status)
  }
}

const handleDragEnd = () => {
  // Clean up any drag state if needed
}

// Helper functions for status display
const getStatusColor = (status: string) => {
  switch (status) {
    case 'todo': return 'blue'
    case 'in-progress': return 'orange'
    case 'done': return 'green'
    default: return 'grey'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'todo': return 'To Do'
    case 'in-progress': return 'In Progress'
    case 'done': return 'Done'
    default: return status
  }
}
</script>

<template>
  <v-card
    class="task-card mb-3"
    elevation="2"
    hover
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <v-card-title class="text-subtitle-1 font-weight-bold py-3 px-4">
      {{ task.title }}
    </v-card-title>
    
    <v-card-text class="px-4 pb-2">
      <p class="text-body-2 text-medium-emphasis mb-0">
        {{ task.description }}
      </p>
    </v-card-text>

    <v-card-actions class="px-4 pb-3">
      <v-chip size="x-small" variant="tonal" :color="getStatusColor(task.status)">
        {{ getStatusLabel(task.status) }}
      </v-chip>
      <v-spacer></v-spacer>
      <v-btn
        icon="mdi-pencil"
        size="small"
        variant="text"
        density="comfortable"
        @click.stop="handleEdit"
      >
        <v-icon size="18">mdi-pencil</v-icon>
        <v-tooltip activator="parent" location="top">Edit</v-tooltip>
      </v-btn>
      <v-btn
        icon="mdi-delete"
        size="small"
        variant="text"
        density="comfortable"
        color="error"
        @click.stop="handleDelete"
      >
        <v-icon size="18">mdi-delete</v-icon>
        <v-tooltip activator="parent" location="top">Delete</v-tooltip>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.task-card {
  cursor: move;
  transition: all 0.2s ease-in-out;
  border-radius: 8px;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.task-card:active {
  cursor: grabbing;
  opacity: 0.7;
}

/* Better focus state for accessibility */
.task-card:focus-visible {
  outline: 2px solid #1976D2;
  outline-offset: 2px;
}
</style>
