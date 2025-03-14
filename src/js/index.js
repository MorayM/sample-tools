/// <reference path="./globals.js" />

import SampleInfoState from "./SampleInfoState.js";

const dropZone = document.getElementById("dropZone");
const sfzOutput = document.getElementById("sfzOutput");
const dsOutput = document.getElementById("dsOutput");
const copySFZ = document.getElementById("copySFZ");
const downloadSFZ = document.getElementById("downloadSFZ");
const copyDS = document.getElementById("copyDS");
const downloadDS = document.getElementById("downloadDS");

/**
 * Callback function to run when processing is complete.
 * @param {SampleInfoState} state The new state
 */
const onProcessComplete = (state) => {
  sfzOutput.innerText = state.sfz;
  dsOutput.innerText = state.dspreset;
};

const sampleInfoState = new SampleInfoState(onProcessComplete);

dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZone.classList.add("highlight");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("highlight");
});

dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropZone.classList.remove("highlight");
    sampleInfoState.loadNewFiles(event.dataTransfer.files);
});

copySFZ.addEventListener("click", () => {
  navigator.clipboard.writeText(sampleInfoState.sfz);
  alert("SFZ copied to clipboard!");
});

downloadSFZ.addEventListener("click", () => downloadFile("preset.sfz", sampleInfoState.sfz));

copyDS.addEventListener("click", () => {
  navigator.clipboard.writeText(sampleInfoState.dspreset);
  alert("DS Preset copied to clipboard!");
});

downloadDS.addEventListener("click", () => downloadFile("preset.dspreset", sampleInfoState.dspreset));

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}