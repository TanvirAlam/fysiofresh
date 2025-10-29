<script setup lang="ts">
import { ref } from 'vue'
import type { Column, Task, TaskStatus } from '@/types'
import TaskCard from './TaskCard.vue'
import './KanbanColumn.css'

interface Props {
  column: Column
  tasks: Task[]
}

interface Emits {
  (e: 'edit', task: Task): void
  (e: 'delete', taskId: string): void
  (e: 'drop', taskId: string, newStatus: TaskStatus): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isDragOver = ref(false)

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
  isDragOver.value = true
}

const handleDragEnter = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = (event: DragEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const x = event.clientX
  const y = event.clientY
  
  if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
    isDragOver.value = false
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  
  if (event.dataTransfer) {
    const taskId = event.dataTransfer.getData('taskId')
    const sourceStatus = event.dataTransfer.getData('taskStatus')
    
    if (taskId && sourceStatus !== props.column.id) {
      emit('drop', taskId, props.column.id)
    }
  }
}
</script>

<template>
  <v-card 
    class="kanban-column" 
    :class="{ 'drag-over': isDragOver }"
    elevation="3"
    rounded="lg"
    @dragover="handleDragOver"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <div class="column-header pa-4" :style="{ backgroundColor: column.color }">
      <span class="text-h6 font-weight-bold" style="color: #2c3e50;">{{ column.title }}</span>
    </div>

    <v-card-text class="pa-4 column-body" style="min-height: 400px; max-height: calc(100vh - 280px); overflow-y: auto;">
      <div v-if="tasks.length === 0" class="empty-state text-center py-12">
        <v-icon size="64" color="grey-lighten-1">mdi-tray</v-icon>
        <p class="text-subtitle-1 text-medium-emphasis mt-4 mb-1">No tasks yet</p>
        <p class="text-caption text-medium-emphasis">Drag tasks here or create a new one</p>
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
