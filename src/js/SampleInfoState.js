/// <reference path="./globals.js" />
import { extractFileInfo } from "./utils/wav.js";
import { buildSfz } from "./utils/sfz.js";
import { buildDSpreset } from "./utils/ds.js";

/**
 * Describes the state of the Sample Info application
 */
export default class SampleInfoState {

  /**
   * Represents the current state of the sample information.
   * @type {SampleInfoState|null}
   */
  state = null;

  processCompleteCallback = null;

  /**
   * @constructor
   * Creates a new SampleInfoState object.
   * @param {ProcessCompleteCallback} callback The callback to run when processing is complete.
   */
  constructor(callback) {
    this.state = {
      fileInfo: [],
      sfz: null,
      dspreset: null,
    };

    this.processCompleteCallback = callback;
  }

  /**
   * Gets an SFZ file for the current sample set as a string.
   * 
   * @returns {string|null} The current SFZ state.
   */
  get sfz() {
    return this.state.sfz;
  }

  /**
   * Gets an Decent Sampler preset file for the current sample set as a string.
   * 
   * @returns {string|null} The current SFZ state.
   */
  get dspreset() {
    return this.state.dspreset;
  }

  updateSFZ() {
    this.state.sfz = buildSfz(this.state.fileInfo);
  }

  updateDSPreset() {
    this.state.dspreset = buildDSpreset(this.state.fileInfo);
  }

  /**
   * Load and process the new files.
   * @param {FileList} files The incoming files.
   */
  loadNewFiles(files) {
    const filePromises = Array.from(files)
      .filter(f => f.type === 'audio/wav')
      .map(extractFileInfo);

    Promise.all(filePromises)
      .then((fileInfo) => {
        this.state.fileInfo = fileInfo.sort((a, b) => a.rootNote - b.rootNote);
        this.updateSFZ();
        this.updateDSPreset();
        if (this.processCompleteCallback) {
          this.processCompleteCallback(this.state);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}