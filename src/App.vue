<template>
  <div id="app">
    <header>
      <h1>WAV Loop Extractor & Preset Generator</h1>
    </header>

    <FileDropZone @files-selected="handleFilesSelected" />

    <div v-if="isProcessing" class="processing">Processing files...</div>

    <div v-if="error" class="error">Error: {{ error }}</div>

    <ResultsDisplay :sfz="sfz" :dspreset="dspreset" />

    <InfoSection />
  </div>
</template>

<script setup lang="ts">
import FileDropZone from './components/FileDropZone.vue'
import ResultsDisplay from './components/ResultsDisplay.vue'
import InfoSection from './components/InfoSection.vue'
import { useSampleProcessor } from './composables/useSampleProcessor'

const { sfz, dspreset, isProcessing, error, loadNewFiles } =
  useSampleProcessor()

async function handleFilesSelected(files: FileList) {
  await loadNewFiles(files)
}
</script>

<style>
.processing {
  text-align: center;
  padding: 20px;
  font-style: italic;
  color: #666;
}

.error {
  text-align: center;
  padding: 20px;
  color: #d32f2f;
  background-color: #ffebee;
  border: 1px solid #f8bbd9;
  border-radius: 4px;
  margin: 20px;
}
</style>
