import type { LoopInfo, SampleFileInfo } from './types'
import { noteNameToMidiNumber } from './note'

function getString(dataView: DataView, offset: number, length: number): string {
  return new TextDecoder('utf-8').decode(
    dataView.buffer.slice(offset, offset + length)
  )
}

/**
 * Parses the 'smpl' chunk of a WAV file to extract loop points.
 *
 * @param dataView - The DataView containing the WAV file data.
 * @param offset - The byte offset where the 'smpl' chunk starts.
 * @returns An array of loop points, each with a start and end sample position.
 */
function parseSmplChunk(dataView: DataView, offset: number): LoopInfo[] {
  const numLoops = dataView.getUint32(offset + 28, true)
  const loops: LoopInfo[] = []

  for (let i = 0; i < numLoops; i++) {
    const loopOffset = offset + 36 + i * 24
    const start = dataView.getUint32(loopOffset + 8, true)
    const end = dataView.getUint32(loopOffset + 12, true)
    loops.push({ start, end })
  }

  return loops
}

/**
 * Finds and parses the 'smpl' chunk in a WAV file.
 *
 * @param dataView - The DataView representing the WAV file data.
 * @returns The parsed 'smpl' chunk data if found, otherwise null.
 */
function getLoopPoints(dataView: DataView): LoopInfo[] | null {
  let offset = 12

  while (offset < dataView.byteLength) {
    const chunkID = getString(dataView, offset, 4)
    const chunkSize = dataView.getUint32(offset + 4, true)

    if (chunkID === 'smpl') {
      return parseSmplChunk(dataView, offset + 8)
    }

    offset += chunkSize + 8
  }

  return null
}

/**
 * Finds the position of the "data" chunk in a WAV file. This is used to calculate the length of the file.
 *
 * @param dataView - The DataView representing the WAV file data.
 * @returns The offset of the "data" chunk, or -1 if not found.
 */
function findDataChunkOffset(dataView: DataView): number {
  let offset = 12
  while (offset < dataView.byteLength) {
    const chunkID = getString(dataView, offset, 4)
    const chunkSize = dataView.getUint32(offset + 4, true)
    if (chunkID === 'data') return offset // Found the "data" chunk
    offset += chunkSize + 8
  }
  return -1 // Not found
}

/**
 * Extracts as much information as possible from a WAV file.
 * @param file The file to process
 * @returns The extracted information
 */
export function extractFileInfo(file: File): Promise<SampleFileInfo> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = function (event) {
      const arrayBuffer = event.target?.result as ArrayBuffer
      const dataView = new DataView(arrayBuffer)

      try {
        // Extract WAV metadata
        const channels = dataView.getUint16(22, true) // Number of channels at byte 22
        const sampleRate = dataView.getUint32(24, true) // Sample rate at byte 24
        const bitDepth = dataView.getUint16(34, true) // Bit depth at byte 34
        const dataChunkOffset = findDataChunkOffset(dataView)
        const length =
          (dataView.getUint32(dataChunkOffset + 4, true) /
            (bitDepth / 8) /
            channels) |
          0 // Convert bytes to samples per channel
        // Extract loop points
        const smplChunk = getLoopPoints(dataView)
        // Extract root note from file name - NB some Best Service samples have the # before the note name
        const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, '')
        const noteMatch = fileNameWithoutExtension.match(
          /([a-gA-G][#b]?\d|#[a-gA-G]\d)$/
        )
        const rootNoteName = noteMatch ? noteMatch[0] : null

        const fileInfo: SampleFileInfo = {
          name: file.name,
          length,
          sampleRate,
          bitDepth,
          channels,
          errors: [],
          rootNoteName,
          rootNote: noteNameToMidiNumber(rootNoteName),
          loops: smplChunk,
        }
        resolve(fileInfo)
      } catch (error) {
        console.error(error)
        reject(
          `Error processing file ${file.name}: ${
            error instanceof Error ? error.message : String(error)
          }`
        )
      }
    }

    reader.onerror = () => reject(`Failed to read file: ${file.name}`)
    reader.readAsArrayBuffer(file)
  })
}
