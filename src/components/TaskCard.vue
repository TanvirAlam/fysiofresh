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
    elevation="2"
    hover
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <v-card-title class="text-subtitle-1 font-weight-bold">
      {{ task.title }}
    </v-card-title>
    
    <v-card-text>
      <p class="text-body-2 text-medium-emphasis">
        {{ task.description }}
      </p>
    </v-card-text>

    <v-card-actions>
      <v-chip size="x-small" variant="outlined">
        {{ task.status }}
      </v-chip>
      <v-spacer></v-spacer>
      <v-btn
        icon="mdi-pencil"
        size="x-small"
        variant="text"
        density="comfortable"
        @click.stop="handleEdit"
      ></v-btn>
      <v-btn
        icon="mdi-delete"
        size="x-small"
        variant="text"
        density="comfortable"
        color="error"
        @click.stop="handleDelete"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.task-card {
  cursor: move;
  transition: all 0.2s ease-in-out;
}

.task-card:hover {
  transform: translateY(-2px);
}

.task-card:active {
  cursor: grabbing;
}
</style>
