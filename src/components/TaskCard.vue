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
</script>

<template>
  <v-card
    class="task-card mb-3"
    elevation="1"
    hover
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <v-card-text class="pa-3">
      <div class="d-flex justify-space-between align-start mb-2">
        <p class="text-body-2 mb-0 flex-grow-1">
          {{ task.title }}
        </p>
        <div class="d-flex">
          <v-btn
            icon
            size="x-small"
            variant="text"
            density="compact"
            @click.stop="handleEdit"
          >
            <v-icon size="16">mdi-pencil</v-icon>
            <v-tooltip activator="parent" location="top">Edit</v-tooltip>
          </v-btn>
          <v-btn
            icon
            size="x-small"
            variant="text"
            density="compact"
            color="error"
            @click.stop="handleDelete"
          >
            <v-icon size="16">mdi-delete</v-icon>
            <v-tooltip activator="parent" location="top">Delete</v-tooltip>
          </v-btn>
        </div>
      </div>
      <p class="text-caption text-medium-emphasis mb-0">
        {{ task.description }}
      </p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.task-card {
  cursor: move;
  transition: all 0.2s ease-in-out;
  border-radius: 12px;
  background: white;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12) !important;
}

.task-card:active {
  cursor: grabbing;
  opacity: 0.8;
}

/* Better focus state for accessibility */
.task-card:focus-visible {
  outline: 2px solid #1976D2;
  outline-offset: 2px;
}
</style>
