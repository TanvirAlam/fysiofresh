<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/composables/useTaskStore'

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
    <v-app-bar color="primary" prominent>
      <v-app-bar-title>{{ appTitle }}</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>Welcome to Fysiofresh Kanban Board</v-card-title>
              <v-card-text>
                <p>This application is built with:</p>
                <v-chip class="ma-1" color="primary">Vue 3</v-chip>
                <v-chip class="ma-1" color="secondary">Vuetify</v-chip>
                <v-chip class="ma-1" color="success">Composition API</v-chip>
                <v-chip class="ma-1" color="info">TypeScript</v-chip>
                
                <v-divider class="my-4"></v-divider>
                
                <h3 class="mb-2">Store Status</h3>
                <v-row>
                  <v-col v-for="column in store.columns.value" :key="column.id" cols="12" sm="4">
                    <v-card :color="column.color" variant="tonal">
                      <v-card-title>{{ column.title }}</v-card-title>
                      <v-card-text>
                        <div class="text-h3">{{ store.getTaskCount(column.id).value }}</div>
                        <div class="text-caption">tasks</div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                
                <p class="mt-4 text-caption">
                  Total tasks: {{ store.allTasks.value.length }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
