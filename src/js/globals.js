/**
 * @typedef {Object} LoopInfo
 * @property {number} start - The start of the loop
 * @property {number} end - The end of the loop
 */

/**
 * @typedef {Object} SampleFileInfo
 * @property {string} name - The name of the file
 * @property {number} length - The length of the file in samples
 * @property {number} sampleRate - The sample rate of the file
 * @property {number} bitDepth - The bit depth of the file
 * @property {number} channels - The number of channels in the file
 * @property {string} rootNoteName - The root note of the file as a note name
 * @property {number} rootNote - The root note of the file
 * @property {string[]} errors - Any errors found in the file
 * @property {LoopInfo[]|null} loops - All loop points in the file
 */

/**
 * @typedef {Object} SampleInfoState
 * @property {SampleFileInfo[]} fileInfo - Info about each file in the set.
 * @property {string|null} sfz - The SFZ file as a string.
 * @property {string|null} dspreset - The Decent Sampler file as a string.
 */

/**
 * @callback ProcessCompleteCallback
 * @param {SampleInfoState} state - The updated state
 */
