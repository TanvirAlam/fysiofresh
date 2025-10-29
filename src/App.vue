<script setup lang="ts">
import { ref } from 'vue'

const appTitle = ref('Fysiofresh Kanban Board')
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
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
