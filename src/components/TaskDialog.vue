<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Task, TaskStatus, NewTask } from '@/types'

interface Props {
  modelValue: boolean
  task?: Task | null
  mode: 'create' | 'edit'
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', task: NewTask | { id: string; updates: Partial<Omit<Task, 'id'>> }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formTitle = ref('')
const formDescription = ref('')
const formStatus = ref<TaskStatus>('todo')
const isLoading = ref(false)

const statusOptions: { value: TaskStatus; title: string; color: string }[] = [
  { value: 'todo', title: 'To Do', color: 'blue' },
  { value: 'in-progress', title: 'In Progress', color: 'orange' },
  { value: 'done', title: 'Done', color: 'green' }
]

const dialogTitle = computed(() => props.mode === 'create' ? 'Add New Task' : 'Edit Task')
const saveButtonText = computed(() => props.mode === 'create' ? 'Create' : 'Update')

// Validation rules
const titleRules = [
  (v: string) => !!v || 'Title is required',
  (v: string) => v.length >= 3 || 'Title must be at least 3 characters'
]

const descriptionRules = [
  (v: string) => !!v || 'Description is required',
  (v: string) => v.length >= 10 || 'Description must be at least 10 characters'
]

const isFormValid = computed(() => {
  return formTitle.value.length >= 3 && 
         formDescription.value.length >= 10
})

// Watch for dialog open/close and task changes
watch(() => props.modelValue, (isOpen) => {
  if (isOpen && props.task) {
    // Edit mode - populate form
    formTitle.value = props.task.title
    formDescription.value = props.task.description
    formStatus.value = props.task.status
  } else if (isOpen) {
    // Create mode - reset form
    resetForm()
  }
})

const resetForm = () => {
  formTitle.value = ''
  formDescription.value = ''
  formStatus.value = 'todo'
}

const handleSave = async () => {
  if (!isFormValid.value || isLoading.value) return

  isLoading.value = true
  
  // Simulate async operation (in real app, this would be API call)
  await new Promise(resolve => setTimeout(resolve, 300))

  if (props.mode === 'create') {
    const newTask: NewTask = {
      title: formTitle.value,
      description: formDescription.value,
      status: formStatus.value
    }
    emit('save', newTask)
  } else if (props.task) {
    emit('save', {
      id: props.task.id,
      updates: {
        title: formTitle.value,
        description: formDescription.value,
        status: formStatus.value
      }
    })
  }

  isLoading.value = false
  handleClose()
}

const handleClose = () => {
  if (isLoading.value) return
  emit('update:modelValue', false)
  resetForm()
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    max-width="600"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5 pa-4">
        {{ dialogTitle }}
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="pa-4">
        <v-form @submit.prevent="handleSave">
          <v-text-field
            v-model="formTitle"
            label="Task Title"
            :rules="titleRules"
            variant="outlined"
            class="mb-3"
            autofocus
            required
          ></v-text-field>

          <v-textarea
            v-model="formDescription"
            label="Description"
            :rules="descriptionRules"
            variant="outlined"
            rows="4"
            class="mb-3"
            required
          ></v-textarea>

          <v-select
            v-model="formStatus"
            label="Status"
            :items="statusOptions"
            item-title="title"
            item-value="value"
            variant="outlined"
          >
            <template #item="{ props: itemProps, item }">
              <v-list-item v-bind="itemProps">
                <template #prepend>
                  <v-icon :color="item.raw.color">mdi-circle</v-icon>
                </template>
              </v-list-item>
            </template>
            <template #selection="{ item }">
              <div class="d-flex align-center">
                <v-icon :color="item.raw.color" size="small" class="mr-2">mdi-circle</v-icon>
                {{ item.raw.title }}
              </div>
            </template>
          </v-select>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn
          variant="text"
          @click="handleClose"
          :disabled="isLoading"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          @click="handleSave"
          :disabled="!isFormValid || isLoading"
          :loading="isLoading"
        >
          {{ saveButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
