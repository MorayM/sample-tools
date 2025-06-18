import type { SampleFileInfo } from './types'

/**
 * @param defaultPath The directory containing the samples.
 * @returns The control section as a string
 */
function buildControl(defaultPath: string): string {
  return `<control>\ndefault_path=${defaultPath}/\n\n`
}

/**
 * @param sample The sample file to build the region from.
 * @returns The region as a string.
 */
function buildRegion(sample: SampleFileInfo): string {
  let region = `<region> lokey=${sample.loNote ?? '60'} hikey=${
    sample.hiNote ?? '60'
  } pitch_keycenter=${sample.rootNote ?? '60'} sample=${sample.name}`
  if (sample.loops?.length) {
    region += ` loop_mode=loop_continuous loop_start=${sample.loops[0].start} loop_end=${sample.loops[0].end}`
  } else {
    region += ` loop_mode=no_loop\n`
  }
  return region
}

/**
 * Builds a SFZ file from the given samples.
 * @param samples The sample files to build the SFZ file from.
 * @param defaultPath The directory containing the samples.
 * @returns The SFZ file as a string.
 */
export function buildSfz(
  samples: SampleFileInfo[],
  defaultPath: string = 'Samples'
): string {
  const header = buildControl(defaultPath)
  const regions = samples.map(buildRegion)
  return header + '<group>\n' + regions.join('\n')
}
