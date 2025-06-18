import type { SampleFileInfo } from './types'

const noteNameMap = new Map([
  ['C', 0],
  ['C#', 1],
  ['Db', 1],
  ['D', 2],
  ['D#', 3],
  ['Eb', 3],
  ['E', 4],
  ['F', 5],
  ['F#', 6],
  ['Gb', 6],
  ['G', 7],
  ['G#', 8],
  ['Ab', 8],
  ['A', 9],
  ['A#', 10],
  ['Bb', 10],
  ['B', 11],
])

/**
 * Converts the note name (e.g. A#4) to a MIDI number.
 * Uses C4 as middle C (note 60), with A0 as the lowest note (21) and C8 as the highest (108).
 *
 * If you're sampling outside of this range, please take a long hard look at your life choices.
 * Uses the formula MIDI = 12 * (octave + 1) + noteIndex
 * @param noteName The note name from the sample name
 */
export function noteNameToMidiNumber(noteName: string | null): number | null {
  if (!noteName || noteName.length > 3) return null
  try {
    // Get the octave number
    const octaveMatch = noteName.match(/\d/)
    const octave = octaveMatch ? parseInt(octaveMatch[0], 10) : 4
    // If there's no octave number or if we're off the end of a piano
    if (octave === null || octave < 0 || octave > 8) return null

    // Get just the note name
    let note = noteName.replace(/\d/, '')
    // Handle Best Service's weird note names
    if (note[0] === '#') note = note.slice(1) + '#'
    // Ensure uppercase
    note =
      note.length === 1 ? note.toUpperCase() : note[0].toUpperCase() + note[1]

    if (!noteNameMap.has(note)) return null

    return 12 * (octave + 1) + noteNameMap.get(note)!
  } catch (e) {
    console.error(e)
    return null
  }
}

/**
 * @param file The current file in the array
 * @param currentIndex The index of the current file in the array
 * @param allFiles The file list
 * @returns The file with updated key ranges
 */
export function setSampleRange(
  file: SampleFileInfo,
  currentIndex: number,
  allFiles: SampleFileInfo[]
): SampleFileInfo {
  const result = { ...file }
  // Set the hi note to the root note of the next file, or 127 if this is the last file
  if (currentIndex === allFiles.length - 1) {
    result.hiNote = 127
  } else {
    result.hiNote = file.rootNote ?? 60
  }
  // Set the lo note to one above the root note of the previous file, or 0 if this is the first file
  if (currentIndex === 0) {
    result.loNote = 0
  } else {
    result.loNote = (allFiles[currentIndex - 1].rootNote ?? 60) + 1
  }
  return result
}
