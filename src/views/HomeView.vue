<template>
  <div class="main-content">
    <FileDropZone @files-selected="handleFilesSelected" />

    <div v-if="isProcessing" class="processing">Processing files...</div>

    <div v-if="error" class="error">Error: {{ error }}</div>

    <ResultsDisplay :sfz="sfz" :dspreset="dspreset" />

    <InfoSection />
  </div>
</template>

<script setup lang="ts">
import FileDropZone from '../components/FileDropZone.vue'
import ResultsDisplay from '../components/ResultsDisplay.vue'
import InfoSection from '../components/InfoSection.vue'
import { useSampleProcessor } from '../composables/useSampleProcessor'

const { sfz, dspreset, isProcessing, error, loadNewFiles } =
  useSampleProcessor()

async function handleFilesSelected(files: FileList) {
  await loadNewFiles(files)
}
</script>

<style scoped>
.main-content {
  padding: 2rem;
}

.processing {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  color: #667eea;
  font-size: 1.1rem;
  font-weight: 500;
}

.processing::before {
  content: '';
  width: 24px;
  height: 24px;
  border: 3px solid #667eea;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  margin: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #fee 0%, #fdd 100%);
  border: 2px solid #f5c6cb;
  border-radius: 12px;
  color: #721c24;
  text-align: center;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.15);
}

.error::before {
  content: '⚠️';
  display: block;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
</style>
