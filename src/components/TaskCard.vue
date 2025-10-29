<script setup lang="ts">
import type { Task } from '@/types'

interface Props {
  task: Task
}

defineProps<Props>()
</script>

<template>
  <v-card
    class="task-card mb-3"
    elevation="2"
    hover
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
      ></v-btn>
      <v-btn
        icon="mdi-delete"
        size="x-small"
        variant="text"
        density="comfortable"
        color="error"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.task-card {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.task-card:hover {
  transform: translateY(-2px);
}
</style>
