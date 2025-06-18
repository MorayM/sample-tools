<template>
  <div class="upload-section">
    <div
      class="drop-zone"
      :class="{ 'drop-zone--active': isDragOver }"
      @dragover.prevent="handleDragOver"
      @dragleave="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <div class="drop-zone__icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7,10 12,15 17,10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      </div>
      <div class="drop-zone__content">
        <h3 class="drop-zone__title">Drop your WAV files here</h3>
        <p class="drop-zone__subtitle">
          We'll extract loop points and generate sampler presets
        </p>
        <p class="drop-zone__hint">
          Files stay on your computer - nothing is uploaded
        </p>
      </div>
    </div>

    <div class="file-input-section">
      <span class="file-input-label">or</span>
      <button class="file-input-button" @click="triggerFileInput">
        Choose Files
      </button>
      <input
        ref="fileInputRef"
        type="file"
        accept=".wav"
        multiple
        @change="handleFileInput"
        class="file-input-hidden"
      />
    </div>

    <div class="supported-formats">
      <p class="supported-formats__text">
        Supports WAV files with embedded loop points • Max 100MB per file
      </p>
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

<style scoped>
.upload-section {
  max-width: 600px;
  margin: 0 auto 3rem;
}

.drop-zone {
  border: 3px dashed #d1d5db;
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.drop-zone:hover {
  border-color: #667eea;
  background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
}

.drop-zone--active {
  border-color: #667eea;
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
  transform: scale(1.02);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.25);
}

.drop-zone__icon {
  margin-bottom: 1.5rem;
}

.drop-zone__icon svg {
  width: 64px;
  height: 64px;
  color: #667eea;
  transition: transform 0.3s ease;
}

.drop-zone:hover .drop-zone__icon svg {
  transform: scale(1.1);
}

.drop-zone__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.drop-zone__subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.drop-zone__hint {
  font-size: 0.9rem;
  color: #9ca3af;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.drop-zone__hint::before {
  content: '🔒';
  font-size: 1rem;
}

.file-input-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.file-input-label {
  color: #6b7280;
  font-size: 1.1rem;
  font-weight: 500;
}

.file-input-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.file-input-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.file-input-button:active {
  transform: translateY(0);
}

.file-input-hidden {
  display: none;
}

.supported-formats {
  text-align: center;
  margin-top: 1.5rem;
}

.supported-formats__text {
  color: #9ca3af;
  font-size: 0.9rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.supported-formats__text::before {
  content: 'ℹ️';
  font-size: 1rem;
}

@media (max-width: 640px) {
  .drop-zone {
    padding: 2rem 1rem;
  }

  .drop-zone__title {
    font-size: 1.25rem;
  }

  .drop-zone__subtitle {
    font-size: 1rem;
  }

  .file-input-section {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
