export interface LoopInfo {
  start: number // The start of the loop
  end: number // The end of the loop
}

export interface SampleFileInfo {
  name: string // The name of the file
  length: number // The length of the file in samples
  sampleRate: number // The sample rate of the file
  bitDepth: number // The bit depth of the file
  channels: number // The number of channels in the file
  rootNoteName: string | null // The root note of the file as a note name
  rootNote: number | null // The root note of the file
  loNote?: number // The lowest note played by this sample
  hiNote?: number // The highest note played by this sample
  errors: string[] // Any errors found in the file
  loops: LoopInfo[] | null // All loop points in the file
}

export interface SampleInfoState {
  fileInfo: SampleFileInfo[] // Info about each file in the set.
  sfz: string | null // The SFZ file as a string.
  dspreset: string | null // The Decent Sampler file as a string.
}

export type ProcessCompleteCallback = (state: SampleInfoState) => void
