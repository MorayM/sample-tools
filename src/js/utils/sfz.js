/// <reference path="../globals.js" />

/**
 * 
 * @param {string} defaultPath The directory containing the samples.
 * @returns 
 */
function buildHeader(defaultPath) {
  return `<group>\ndefault_path=${defaultPath}/\n\n`;
}

/**
 * 
 * @param {SampleFileInfo} sample The sample file to build the region from.
 * @returns {string} The region as a string.
 */
function buildSampleRegion(sample) {
  let region = `<region>\nlokey=${sample.rootNote || "60"}\nhikey=${sample.rootNote || "60"}\npitch_keycenter=${sample.rootNote || "60"}\nsample=${sample.name}\n`;
  if (sample.loops.length) {
    region += `loop_mode=loop_continuous\nloop_start=${sample.loops[0].start}\nloop_end=${sample.loops[0].end}\n`;
  } else {
    region += `loop_mode=no_loop\n`;
  }
  return region;
}

/**
 * Builds a SFZ file from the given samples.
 * @param {SampleFileInfo[]} samples The sample files to build the SFZ file from.
 * @param {string} defaultPath The directory containing the samples.
 * @returns {string} The SFZ file as a string.
 */
export function buildSfz(samples, defaultPath = "Samples") {
  const header = buildHeader(defaultPath);
  const regions = samples.map(buildSampleRegion);
  return header + regions.join('\n');
}