/// <reference path="../globals.js" />

function getString(dataView, offset, length) {
  return new TextDecoder("utf-8").decode(dataView.buffer.slice(offset, offset + length));
}

/**
 * Parses the 'smpl' chunk of a WAV file to extract loop points.
 *
 * @param {DataView} dataView - The DataView containing the WAV file data.
 * @param {number} offset - The byte offset where the 'smpl' chunk starts.
 * @returns {LoopInfo[]} An array of loop points, each with a start and end sample position.
 */
function parseSmplChunk(dataView, offset) {
  const numLoops = dataView.getUint32(offset + 28, true);
  const loops = [];

  for (let i = 0; i < numLoops; i++) {
      let loopOffset = offset + 36 + i * 24;
      let start = dataView.getUint32(loopOffset + 8, true);
      let end = dataView.getUint32(loopOffset + 12, true);
      loops.push({ start, end });
  }

  return loops;
}

/**
 * Finds and parses the 'smpl' chunk in a WAV file.
 *
 * @param {DataView} dataView - The DataView representing the WAV file data.
 * @returns {LoopInfo[]|null} The parsed 'smpl' chunk data if found, otherwise null.
 */
function getLoopPoints(dataView) {
  let offset = 12; 

  while (offset < dataView.byteLength) {
      const chunkID = getString(dataView, offset, 4);
      const chunkSize = dataView.getUint32(offset + 4, true); 

      if (chunkID === "smpl") {
          return parseSmplChunk(dataView, offset + 8);
      }

      offset += chunkSize + 8; 
  }

  return null;
}

/**
 * Finds the position of the "data" chunk in a WAV file. This is used to calculate the length of the file.
 *
 * @param {DataView} dataView - The DataView representing the WAV file data.
 * @returns {number} The offset of the "data" chunk, or -1 if not found.
 */
function findDataChunkOffset(dataView) {
    let offset = 12;
    while (offset < dataView.byteLength) {
        const chunkID = getString(dataView, offset, 4);
        const chunkSize = dataView.getUint32(offset + 4, true);
        if (chunkID === "data") return offset; // Found the "data" chunk
        offset += chunkSize + 8;
    }
    return -1; // Not found
}

/**
 * Extracts as much information as possible from a WAV file.
 * @param {File} file The file to process
 * @returns {Promise<SampleFileInfo>} The extracted information
 */
export function extractFileInfo(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function(event) {
      const arrayBuffer = event.target.result;
      const dataView = new DataView(arrayBuffer);

      try {
        // Extract WAV metadata
        const channels = dataView.getUint16(22, true); // Number of channels at byte 22
        const sampleRate = dataView.getUint32(24, true); // Sample rate at byte 24
        const bitDepth = dataView.getUint16(34, true); // Bit depth at byte 34
        const dataChunkOffset = findDataChunkOffset(dataView);
        const length = (dataView.getUint32(dataChunkOffset + 4, true) / (bitDepth / 8) / channels) | 0; // Convert bytes to samples per channel
        // Extract loop points
        const smplChunk = getLoopPoints(dataView);

        const fileInfo = {
          name: file.name,
          length,
          sampleRate,
          bitDepth,
          channels,
          errors: [],
          loops: smplChunk,
        }
        resolve(fileInfo);
      } catch (error) {
        console.error(error);
        reject(`Error processing file ${file.name}: ${error.message}`);
      };
    }

    reader.onerror = () => reject(`Failed to read file: ${file.name}`);
    reader.readAsArrayBuffer(file);
  });
}