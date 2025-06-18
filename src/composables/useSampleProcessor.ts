import { ref, computed } from 'vue'
import type { SampleFileInfo, SampleInfoState } from '../utils/types'
import { extractFileInfo } from '../utils/wav'
import { buildSfz } from '../utils/sfz'
import { buildDSpreset } from '../utils/ds'
import { setSampleRange } from '../utils/note'

const VALID_FILE_TYPES = [
  'audio/wav',
  'audio/vnd.wave',
  'audio/wave',
  'audio/x-wav',
  'audio/x-pn-wav',
]

// Maximum file size: 100MB per file
const MAX_FILE_SIZE = 100 * 1024 * 1024

export function useSampleProcessor() {
  const fileInfo = ref<SampleFileInfo[]>([])
  const isProcessing = ref(false)
  const error = ref<string | null>(null)

  const sfz = computed(() => {
    if (fileInfo.value.length === 0) return null
    return buildSfz(fileInfo.value)
  })

  const dspreset = computed(() => {
    if (fileInfo.value.length === 0) return null
    return buildDSpreset(fileInfo.value)
  })

  const state = computed<SampleInfoState>(() => ({
    fileInfo: fileInfo.value,
    sfz: sfz.value,
    dspreset: dspreset.value,
  }))

  async function loadNewFiles(files: FileList) {
    isProcessing.value = true
    error.value = null

    try {
      const validFiles = Array.from(files).filter((f) => {
        if (!VALID_FILE_TYPES.includes(f.type)) {
          return false
        }
        if (f.size > MAX_FILE_SIZE) {
          console.warn(
            `File ${f.name} is too large (${Math.round(f.size / 1024 / 1024)}MB), skipping`
          )
          return false
        }
        return true
      })

      if (validFiles.length === 0) {
        const hasOversizedFiles = Array.from(files).some(
          (f) => f.size > MAX_FILE_SIZE
        )
        const hasValidType = Array.from(files).some((f) =>
          VALID_FILE_TYPES.includes(f.type)
        )

        if (hasOversizedFiles) {
          throw new Error('Files are too large. Maximum file size is 100MB.')
        } else if (!hasValidType) {
          throw new Error('No valid WAV files found')
        } else {
          throw new Error('No valid WAV files found (files may be too large)')
        }
      }

      const filePromises = validFiles.map(extractFileInfo)
      const processedFiles = await Promise.all(filePromises)

      fileInfo.value = processedFiles
        .sort((a, b) => (a.rootNote ?? 60) - (b.rootNote ?? 60))
        .map(setSampleRange)
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'An unknown error occurred'
      console.error(err)
    } finally {
      isProcessing.value = false
    }
  }

  function reset() {
    fileInfo.value = []
    error.value = null
  }

  return {
    fileInfo: computed(() => fileInfo.value),
    sfz,
    dspreset,
    state,
    isProcessing: computed(() => isProcessing.value),
    error: computed(() => error.value),
    loadNewFiles,
    reset,
  }
}
