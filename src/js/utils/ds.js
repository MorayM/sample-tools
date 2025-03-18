/// <reference path="../globals.js" />

const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
const xmlSchema = '<?xml-model href="https://raw.githubusercontent.com/praashie/DecentSampler-schema/main/DecentSampler.xsd" ?>';

/**
 * 
 * @param {string[]} groups The groups in this preset.
 * @param {string} minVersion The minimum version of Decent Sampler required to use this preset.
 * @param {boolean} includeSchema Whether to include the schema in the output. NB: This version of the schema is very out of date!
 * @returns {string} The groups wrapped in the DecentSampler tag as a string.
 */
function wrapGroups(groups, minVersion = '1.12.0', includeSchema = false) {
  let xml = `${xmlHeader}`;
  if (includeSchema) {
    xml += `\n${xmlSchema}`;
  }
  xml += `\n<DecentSampler minVersion="${minVersion}">\n  <groups>\n${groups.join('\n')}\n  </groups>\n</DecentSampler>`;
  return xml;
}

/**
 * 
 * @param {SampleFileInfo} sample The sample file to build the region from.
 * @param {string} defaultPath The directory containing the samples.
 * @returns {string} The region as a string.
 */
function buildSampleTag(sample, defaultPath) {
  let tag = `      <sample path="${defaultPath}/${sample.name}" rootNote="${sample.rootNote ?? "60"}" loNote="${sample.loNote ?? "60"}" hiNote="${sample.hiNote ?? "60"}" start="0" end="${sample.length}"`;
  if (sample.loops?.length) {
    tag += ` loopEnabled="true" loopStart="${sample.loops[0].start}" loopEnd="${sample.loops[0].end}" loopCrossfade="0"`;
  } else {
    tag += ` loopEnabled="false"`;
  }
  tag += ` />`;
  return tag;
}

/**
 * Builds a Decent Sampler preset file from the given samples.
 * @param {SampleFileInfo[]} samples The sample files to build the Decent Sampler preset file from.
 * @returns {string} The Decent Sampler preset file as a string.
 */
export function buildDSpreset(samples, defaultPath = "Samples") {
  const sampleTags = samples.map(s => buildSampleTag(s, defaultPath));
  return wrapGroups([`    <group>\n${sampleTags.join('\n')}\n    </group>`]);
}