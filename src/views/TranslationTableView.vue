<template>
  <div class="translation-page">
    <div class="translation-page__intro">
      <h2 class="translation-page__title">Translation Table Generator</h2>
      <p class="translation-page__subtitle">
        Generate <code>translationTable</code> values for DecentSampler
        <code>&lt;binding translation="table"&gt;</code>. Non-linear curves for
        control elements (e.g. logarithmic for volume).
      </p>
    </div>

    <div class="translation-page__controls card">
      <div class="control-row">
        <label class="control-label">Function</label>
        <select v-model="functionId" class="control-select">
          <option value="linear">Linear</option>
          <option value="logarithmic">Logarithmic</option>
          <option value="exponential">Exponential</option>
          <option value="sigmoid">Sigmoid</option>
          <option value="tanh">Tanh</option>
          <option value="sineCosine">Sine/Cosine (equal power)</option>
        </select>
      </div>
      <div class="control-row control-row--inline">
        <div class="control-group">
          <label class="control-label">Min</label>
          <input v-model.number="min" type="number" step="any" class="control-input" />
        </div>
        <div class="control-group">
          <label class="control-label">Max</label>
          <input v-model.number="max" type="number" step="any" class="control-input" />
        </div>
        <div class="control-group">
          <label class="control-label">Steps</label>
          <input v-model.number="steps" type="number" min="1" max="256" class="control-input" />
        </div>
      </div>
      <div class="control-row">
        <label class="control-checkbox">
          <input v-model="reversed" type="checkbox" />
          Reverse
        </label>
      </div>
    </div>

    <div class="translation-page__chart card">
      <h3 class="chart-title">Preview</h3>
      <div class="chart-container">
        <svg
          class="chart-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="0" width="100" height="100" fill="#f8fafc" />
          <path
            :d="steppedPathD"
            fill="none"
            stroke="#667eea"
            stroke-width="1.5"
            stroke-linejoin="miter"
          />
        </svg>
      </div>
      <p class="chart-axes">X: control value (0–1) · Y: translated value</p>
    </div>

    <div class="translation-page__output card">
      <h3 class="output-title">translationTable attribute value</h3>
      <pre class="output-code"><code>{{ translationTableString }}</code></pre>
      <button class="btn btn--primary" @click="copyToClipboard">
        <span class="btn__icon">📋</span>
        Copy to clipboard
      </button>
      <span v-if="copyFeedback" class="copy-feedback">{{ copyFeedback }}</span>
    </div>

    <footer class="page-footer">
      <p class="page-footer__text">
        Need help or found a bug?
        <a href="https://github.com/MorayM/sample-tools" target="_blank">
          Report it on GitHub
        </a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  type FunctionId,
  generateTable,
  formatForDecentSampler,
} from '../utils/translationTable'

const functionId = ref<FunctionId>('linear')
const min = ref(0)
const max = ref(1)
const steps = ref(16)
const reversed = ref(false)
const copyFeedback = ref('')

const points = computed(() => {
  const mn = Number(min.value)
  const mx = Number(max.value)
  const st = Number(steps.value)
  if (!Number.isFinite(mn) || !Number.isFinite(mx) || !Number.isFinite(st)) {
    return generateTable(functionId.value, 0, 1, 16, false)
  }
  return generateTable(functionId.value, mn, mx, st, reversed.value)
})

const translationTableString = computed(() => formatForDecentSampler(points.value))

const steppedPathD = computed(() => {
  const pts = points.value
  if (pts.length === 0) return ''
  const mn = Number.isFinite(Number(min.value)) ? Number(min.value) : 0
  const mx = Number.isFinite(Number(max.value)) ? Number(max.value) : 1
  const range = mx - mn
  const norm = (y: number) => (range === 0 ? 0 : (y - mn) / range)
  const x = (v: number) => v * 100
  const y = (v: number) => 100 - norm(v) * 100
  const segs = pts.map((p) => `${x(p.x)} ${y(p.y)}`)
  return `M ${segs[0]} L ${segs.slice(1).join(' L ')}`
})

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(translationTableString.value)
    copyFeedback.value = 'Copied!'
    setTimeout(() => (copyFeedback.value = ''), 2000)
  } catch {
    copyFeedback.value = 'Copy failed'
    setTimeout(() => (copyFeedback.value = ''), 2000)
  }
}
</script>

<style scoped>
.translation-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.translation-page__intro {
  margin-bottom: 2rem;
}

.translation-page__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.translation-page__subtitle {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.translation-page__subtitle code {
  background: #f3f4f6;
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
}

.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.control-row {
  margin-bottom: 1rem;
}

.control-row:last-child {
  margin-bottom: 0;
}

.control-row--inline {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.control-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.35rem;
}

.control-select {
  width: 100%;
  max-width: 280px;
  padding: 0.5rem 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
}

.control-input {
  width: 6rem;
  padding: 0.5rem 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
}

.control-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #4b5563;
  cursor: pointer;
}

.control-checkbox input {
  width: 1.1rem;
  height: 1.1rem;
}

.chart-title,
.output-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.chart-container {
  aspect-ratio: 16 / 10;
  max-height: 320px;
  background: #f8fafc;
  border-radius: 8px;
}

.chart-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.chart-axes {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0.5rem 0 0 0;
}

.output-code {
  background: #1f2937;
  color: #e5e7eb;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  margin: 0 0 1rem 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.8rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-x: auto;
}

.output-code code {
  background: none;
  color: inherit;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
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

.copy-feedback {
  margin-left: 1rem;
  font-size: 0.9rem;
  color: #059669;
}

.page-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
}

.page-footer__text {
  color: #6b7280;
  font-size: 0.95rem;
  margin: 0;
}

.page-footer__text a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.page-footer__text a:hover {
  color: #5a67d8;
  text-decoration: underline;
}
</style>
