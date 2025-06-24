<template>
  <div v-if="sfz || dspreset" class="results">
    <div class="results__header">
      <h2 class="results__title">🎉 Your Presets Are Ready!</h2>
      <p class="results__subtitle">
        Loop points extracted successfully. Choose your preferred format:
      </p>
    </div>

    <!-- Format Toggle Switch -->
    <div v-if="sfz && dspreset" class="format-toggle">
      <div class="toggle-container">
        <button 
          :class="['toggle-option', { active: activeFormat === 'sfz' }]"
          @click="activeFormat = 'sfz'"
        >
          <img src="/src/assets/images/sfz_file_format_logo.png" alt="SFZ" class="toggle-option__icon" />
          <span class="toggle-option__label">SFZ Format</span>
        </button>
        <button 
          :class="['toggle-option', { active: activeFormat === 'ds' }]"
          @click="activeFormat = 'ds'"
        >
          <img src="/src/assets/images/ds_file_format_logo.png" alt="Decent Sampler" class="toggle-option__icon" />
          <span class="toggle-option__label">Decent Sampler</span>
        </button>
      </div>
    </div>

    <!-- Single Preset Display -->
    <div class="preset-container">
      <!-- SFZ Format -->
      <div v-if="(activeFormat === 'sfz' && sfz) || (!dspreset && sfz)" class="preset-card">
        <div class="preset-card__header">
          <img src="/src/assets/images/sfz_file_format_logo.png" alt="SFZ" class="preset-card__icon" />
          <h3 class="preset-card__title">SFZ Format</h3>
          <p class="preset-card__description">
            Open format supported by Serum 2, Sforzando, and many more.
          </p>
        </div>
        <div class="preset-card__content">
          <pre class="preset-card__code">{{ sfz }}</pre>
        </div>
        <div class="preset-card__actions">
          <button class="btn btn--primary" @click="copySFZ">
            <span class="btn__icon">📋</span>
            Copy to Clipboard
          </button>
          <button class="btn btn--secondary" @click="downloadSFZ">
            <span class="btn__icon">⬇️</span>
            Download File
          </button>
        </div>
      </div>

      <!-- Decent Sampler Format -->
      <div v-if="(activeFormat === 'ds' && dspreset) || (!sfz && dspreset)" class="preset-card">
        <div class="preset-card__header">
          <img src="/src/assets/images/ds_file_format_logo.png" alt="Decent Sampler" class="preset-card__icon" />
          <h3 class="preset-card__title">Decent Sampler</h3>
          <p class="preset-card__description">
            Format for the free Decent Sampler plugin.
          </p>
        </div>
        <div class="preset-card__content">
          <pre class="preset-card__code">{{ dspreset }}</pre>
        </div>
        <div class="preset-card__actions">
          <button class="btn btn--primary" @click="copyDS">
            <span class="btn__icon">📋</span>
            Copy to Clipboard
          </button>
          <button class="btn btn--secondary" @click="downloadDS">
            <span class="btn__icon">⬇️</span>
            Download File
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  sfz: string | null
  dspreset: string | null
}

const props = defineProps<Props>()

// Active format state - defaults to SFZ if available, otherwise DS
const activeFormat = ref<'sfz' | 'ds'>(props.sfz ? 'sfz' : 'ds')

function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain' })
  const a = document.createElement('a')
  const url = URL.createObjectURL(blob)
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  // Clean up the object URL to prevent memory leaks
  URL.revokeObjectURL(url)
}

async function copyToClipboard(text: string, description: string) {
  try {
    if (!navigator.clipboard) {
      throw new Error('Clipboard API not available')
    }
    await navigator.clipboard.writeText(text)
    alert(`${description} copied to clipboard!`)
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    alert(
      `Failed to copy ${description} to clipboard. Please select and copy manually.`
    )
  }
}

async function copySFZ() {
  if (props.sfz) {
    await copyToClipboard(props.sfz, 'SFZ')
  }
}

async function downloadSFZ() {
  if (props.sfz) {
    downloadFile('preset.sfz', props.sfz)
  }
}

async function copyDS() {
  if (props.dspreset) {
    await copyToClipboard(props.dspreset, 'DS Preset')
  }
}

async function downloadDS() {
  if (props.dspreset) {
    downloadFile('preset.dspreset', props.dspreset)
  }
}
</script>

<style scoped>
.results {
  margin-top: 3rem;
}

.results__header {
  text-align: center;
  margin-bottom: 2rem;
}

.results__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.results__subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
}

.format-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.toggle-container {
  display: flex;
  background: #f3f4f6;
  border-radius: 16px;
  padding: 0.5rem;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.toggle-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: #6b7280;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
  justify-content: center;
}

.toggle-option:hover {
  color: #374151;
  background: rgba(255, 255, 255, 0.5);
}

.toggle-option.active {
  background: white;
  color: #1f2937;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.toggle-option__icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.toggle-option__label {
  font-weight: 600;
}

.preset-container {
  display: flex;
  justify-content: center;
}

.preset-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 800px;
}

.preset-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.preset-card__header {
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e5e7eb;
}

.preset-card__icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

.preset-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.preset-card__description {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

.preset-card__content {
  max-height: 400px;
  overflow-y: auto;
  border-bottom: 1px solid #e5e7eb;
}

.preset-card__code {
  background: #1f2937;
  color: #e5e7eb;
  padding: 1.5rem;
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.85rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
}

.preset-card__code::-webkit-scrollbar {
  width: 8px;
}

.preset-card__code::-webkit-scrollbar-track {
  background: #374151;
}

.preset-card__code::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 4px;
}

.preset-card__actions {
  display: flex;
  gap: 0.75rem;
  padding: 1.5rem;
  background: #fafafa;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  justify-content: center;
}

.btn__icon {
  font-size: 1rem;
}

.btn--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn--secondary {
  background: white;
  color: #4b5563;
  border: 2px solid #e5e7eb;
}

.btn--secondary:hover {
  background: #f9fafb;
  border-color: #d1d5db;
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .toggle-container {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }

  .toggle-option {
    min-width: auto;
    width: 100%;
  }

  .preset-card__actions {
    flex-direction: column;
  }

  .btn {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .preset-card__header {
    padding: 1rem;
  }

  .preset-card__actions {
    padding: 1rem;
  }

  .preset-card__code {
    padding: 1rem;
    font-size: 0.8rem;
  }

  .toggle-container {
    padding: 0.25rem;
  }

  .toggle-option {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
