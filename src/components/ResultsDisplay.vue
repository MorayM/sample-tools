<template>
  <div v-if="sfz || dspreset" id="results">
    <div v-if="sfz">
      <h3>Generated SFZ File</h3>
      <pre id="sfzOutput">{{ sfz }}</pre>
      <button class="button" @click="copySFZ">Copy SFZ to Clipboard</button>
      <button class="button" @click="downloadSFZ">Download SFZ File</button>
    </div>

    <div v-if="dspreset">
      <h3>Generated Decent Sampler Preset</h3>
      <pre id="dsOutput">{{ dspreset }}</pre>
      <button class="button" @click="copyDS">
        Copy DS Preset to Clipboard
      </button>
      <button class="button" @click="downloadDS">Download DS File</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  sfz: string | null
  dspreset: string | null
}

const props = defineProps<Props>()

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
    alert(`Failed to copy ${description} to clipboard. Please select and copy manually.`)
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
