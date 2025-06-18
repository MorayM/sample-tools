<template>
  <div id="inputs">
    <div
      id="dropZone"
      :class="{ highlight: isDragOver }"
      @dragover.prevent="handleDragOver"
      @dragleave="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      Drop your WAV files here to extract loop information
    </div>
    <div id="fileInput">
      <span>or </span>
      <input
        ref="fileInputRef"
        type="file"
        id="file"
        accept=".wav"
        multiple
        @change="handleFileInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  filesSelected: [files: FileList]
}>()

const isDragOver = ref(false)
const fileInputRef = ref<HTMLInputElement>()

function handleDragOver() {
  isDragOver.value = true
}

function handleDragLeave() {
  isDragOver.value = false
}

function handleDrop(event: DragEvent) {
  isDragOver.value = false
  const dataTransfer = event.dataTransfer
  if (dataTransfer?.files) {
    emit('filesSelected', dataTransfer.files)
  }
}

function triggerFileInput() {
  fileInputRef.value?.click()
}

function handleFileInput(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    emit('filesSelected', target.files)
  }
}
</script>
