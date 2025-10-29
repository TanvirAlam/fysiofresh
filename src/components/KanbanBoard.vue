<script setup lang="ts">
import { useTaskStore } from '@/composables/useTaskStore'
import KanbanColumn from './KanbanColumn.vue'

const store = useTaskStore()
</script>

<template>
  <v-container fluid class="kanban-board pa-4">
    <v-row>
      <v-col
        v-for="column in store.columns.value"
        :key="column.id"
        cols="12"
        md="4"
      >
        <kanban-column
          :column="column"
          :tasks="store.getTasksByStatus(column.id).value"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.kanban-board {
  background-color: #f5f5f5;
  min-height: calc(100vh - 64px);
}

.kanban-board .v-row {
  height: 100%;
}
</style>
