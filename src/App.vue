<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/composables/useTaskStore'
import KanbanBoard from '@/components/KanbanBoard.vue'

const appTitle = ref('Fysiofresh Kanban Board')
const store = useTaskStore()

onMounted(() => {
  // Initialize with sample data for demonstration
  if (store.allTasks.value.length === 0) {
    store.initializeSampleData()
  }
})
</script>

<template>
  <v-app>
    <v-app-bar color="primary" elevation="2">
      <v-app-bar-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-view-column</v-icon>
        {{ appTitle }}
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-chip class="mr-2" variant="outlined" color="white">
        Total: {{ store.allTasks.value.length }} tasks
      </v-chip>
      <v-btn icon="mdi-plus" color="white"></v-btn>
    </v-app-bar>

    <v-main>
      <kanban-board />
    </v-main>
  </v-app>
</template>

<style scoped></style>
