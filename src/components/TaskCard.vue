<script setup lang="ts">
import type { Task } from '@/types'
import './TaskCard.css'

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

const handleDragStart = (event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('taskId', props.task.id)
    event.dataTransfer.setData('taskStatus', props.task.status)
  }
}

const handleDragEnd = () => {}
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
      <div class="d-flex justify-space-between align-center mb-2">
        <p class="text-body-2 mb-0 flex-grow-1 pr-3">
          {{ task.title }}
        </p>
        <div class="d-flex flex-shrink-0" style="gap: 8px;">
          <v-btn
            icon
            size="small"
            variant="flat"
            density="comfortable"
            color="blue-grey-lighten-4"
            @click.stop="handleEdit"
            class="action-btn"
          >
            <v-icon size="18" color="blue-grey-darken-2">mdi-pencil</v-icon>
            <v-tooltip activator="parent" location="top">Edit</v-tooltip>
          </v-btn>
          <v-btn
            icon
            size="small"
            variant="flat"
            density="comfortable"
            color="red-lighten-4"
            @click.stop="handleDelete"
            class="action-btn"
          >
            <v-icon size="18" color="red-darken-1">mdi-delete</v-icon>
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
