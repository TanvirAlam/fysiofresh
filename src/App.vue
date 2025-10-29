<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Task, NewTask } from '@/types'
import { useTaskStore } from '@/composables/useTaskStore'
import { useToast } from '@/composables/useToast'
import KanbanBoard from '@/components/KanbanBoard.vue'
import TaskDialog from '@/components/TaskDialog.vue'

const appTitle = ref('Fysiofresh Kanban Board')
const store = useTaskStore()
const toast = useToast()

// Dialog state
const showDialog = ref(false)
const dialogMode = ref<'create' | 'edit'>('create')
const selectedTask = ref<Task | null>(null)

// Delete confirmation
const showDeleteConfirm = ref(false)
const taskToDelete = ref<string | null>(null)

onMounted(() => {
  // Initialize with sample data for demonstration
  if (store.allTasks.value.length === 0) {
    store.initializeSampleData()
  }
})

// Add Task
const handleAddTask = () => {
  dialogMode.value = 'create'
  selectedTask.value = null
  showDialog.value = true
}

// Edit Task
const handleEditTask = (task: Task) => {
  dialogMode.value = 'edit'
  selectedTask.value = task
  showDialog.value = true
}

// Delete Task
const handleDeleteTask = (taskId: string) => {
  taskToDelete.value = taskId
  showDeleteConfirm.value = true
}

const confirmDelete = () => {
  if (taskToDelete.value) {
    const task = store.getTaskById(taskToDelete.value)
    store.deleteTask(taskToDelete.value)
    toast.success(`Task "${task?.title || 'Task'}" deleted`)
    taskToDelete.value = null
  }
  showDeleteConfirm.value = false
}

const cancelDelete = () => {
  taskToDelete.value = null
  showDeleteConfirm.value = false
}

// Save Task (Create or Update)
const handleSaveTask = (data: NewTask | { id: string; updates: Partial<Omit<Task, 'id'>> }) => {
  if ('id' in data) {
    // Edit mode
    const task = store.updateTask(data.id, data.updates)
    toast.success(`Task "${task?.title || 'Task'}" updated`)
  } else {
    // Create mode
    const task = store.addTask(data)
    toast.success(`Task "${task.title}" created`)
  }
}
</script>

<template>
  <v-app>
    <v-app-bar color="#17a2b8" elevation="3" height="64">
      <v-app-bar-title class="d-flex align-center font-weight-bold">
        <v-icon class="mr-2" size="28">mdi-view-column</v-icon>
        <span class="text-h6">{{ appTitle }}</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-chip class="mr-3" variant="outlined" color="white" prepend-icon="mdi-format-list-checks">
        {{ store.allTasks.value.length }} {{ store.allTasks.value.length === 1 ? 'task' : 'tasks' }}
      </v-chip>
      <v-btn 
        icon="mdi-plus" 
        color="white" 
        @click="handleAddTask"
        size="large"
      >
        <v-icon>mdi-plus</v-icon>
        <v-tooltip activator="parent" location="bottom">Add New Task</v-tooltip>
      </v-btn>
    </v-app-bar>

    <v-main>
      <kanban-board 
        @edit="handleEditTask"
        @delete="handleDeleteTask"
      />
    </v-main>

    <!-- Task Dialog (Create/Edit) -->
    <task-dialog
      v-model="showDialog"
      :mode="dialogMode"
      :task="selectedTask"
      @save="handleSaveTask"
    />

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="showDeleteConfirm" max-width="400">
      <v-card>
        <v-card-title class="text-h5">Delete Task?</v-card-title>
        <v-card-text>
          Are you sure you want to delete this task? This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="cancelDelete">Cancel</v-btn>
          <v-btn color="error" variant="elevated" @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Toast Notification -->
    <v-snackbar
      v-model="toast.toastState.value.show"
      :color="toast.toastState.value.color"
      :timeout="toast.toastState.value.timeout"
      location="bottom right"
      elevation="6"
    >
      {{ toast.toastState.value.message }}
      <template v-slot:actions>
        <v-btn
          variant="text"
          icon="mdi-close"
          @click="toast.hideToast()"
        ></v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<style scoped></style>
