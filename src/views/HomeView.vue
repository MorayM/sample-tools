<template>
  <div class="main-page">
    <div class="main-page__intro">
      <h2 class="main-page__title">Loop Extractor</h2>
      <p class="main-page__subtitle">
        Drag and drop WAV files into the drop zone below (or click "Choose
        Files"). The tool detects loop points from WAV metadata and generates
        SFZ and Decent Sampler preset files. All processing runs in your
        browser—your samples never leave your computer.
      </p>
    </div>
    <div class="home-intro">
      <h2 class="home-intro__title">Loop Extractor</h2>
      <p class="home-intro__subtitle">
      </p>
    </div>

    <FileDropZone @files-selected="handleFilesSelected" />

    <div v-if="isProcessing" class="processing">Processing files...</div>

    <div v-if="error" class="error">Error: {{ error }}</div>

    <ResultsDisplay :sfz="sfz" :dspreset="dspreset" />

    <Footer />
  </div>
</template>

<script setup lang="ts">
import FileDropZone from '../components/FileDropZone.vue'
import Footer from '../components/Footer.vue'
import ResultsDisplay from '../components/ResultsDisplay.vue'
import { useSampleProcessor } from '../composables/useSampleProcessor'

const { sfz, dspreset, isProcessing, error, loadNewFiles } =
  useSampleProcessor()

async function handleFilesSelected(files: FileList) {
  await loadNewFiles(files)
}
</script>

<style scoped>
.main-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.main-page__intro {
  margin-bottom: 2rem;
}

.main-page__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.main-page__subtitle {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
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
