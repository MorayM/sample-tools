/// <reference path="./globals.js" />

import SampleInfoState from "./SampleInfoState.js";

const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const sfzOutput = document.getElementById("sfzOutput");
const dsOutput = document.getElementById("dsOutput");
const copySFZ = document.getElementById("copySFZ");
const downloadSFZ = document.getElementById("downloadSFZ");
const copyDS = document.getElementById("copyDS");
const downloadDS = document.getElementById("downloadDS");
const results = document.getElementById("results");

const sampleInfoState = new SampleInfoState((state) => {
  sfzOutput.innerText = state.sfz;
  dsOutput.innerText = state.dspreset;
  results.classList.remove("hidden");
});

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
  const dataTransfer = event.dataTransfer || (event.originalEvent && event.originalEvent.dataTransfer);
  sampleInfoState.loadNewFiles(dataTransfer.files);
});

fileInput.addEventListener('change', function(event) {
  event.preventDefault();
  sampleInfoState.loadNewFiles(event.target.files);
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