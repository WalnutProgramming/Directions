"use strict";
import { hallways } from "./hallwayDefinition.js";

// If it's an iOS device, unhide the #iosDownloadSuggestion
const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isInstalledPWA = window.matchMedia("(display-mode: standalone)").matches;
if (iOS && !isInstalledPWA) {
  document.getElementById("iosDownloadSuggestion").style.display = "block";
}

const roomsDatalist = document.getElementById("roomsList");
const roomsList = hallways
  .map(h => h.partList)
  .flat()
  .filter(a => a.name)
  .map(r => r.name)
  .sort();
const aliasesList = hallways
  .map(h => h.partList)
  .flat()
  .filter(a => a.aliases)
  .map(r => r.aliases)
  .sort();
roomsList.forEach(roomName => {
  const option = document.createElement("option");
  option.text = roomName;
  roomsDatalist.appendChild(option);
});

// check that you input a valid room
const inputs = document.querySelectorAll(".roomInput");
inputs.forEach(function(input) {
  // When the value of the input changes...
  input.addEventListener("change", function() {
    // use the setCustomValidity function of the Validation API
    // to provide an user feedback if the room doesn't exist
    if (
      roomsList.map(a => a.toUpperCase()).includes(this.value.toUpperCase()) ||
      aliasesList.map(a => a.toUpperCase()).includes(this.value.toUpperCase())
    ) {
      this.setCustomValidity("");
    } else {
      this.setCustomValidity("I can't find a room with that name.");
    }
  });
});
