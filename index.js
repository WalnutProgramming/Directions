"use strict";
import { hallways } from "./walnut.js";

// If it's an iOS device, unhide the #iosDownloadSuggestion
const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isInstalledPWA = window.matchMedia("(display-mode: standalone)").matches;
if (iOS && !isInstalledPWA) {
  document.getElementById("iosDownloadSuggestion").style.display = "block";
}

const roomsDatalist = document.getElementById("roomsList");
const roomsList = hallways
  .reduce((acc, h) => acc.concat(h.partList), [])
  .filter(a => a.name)
  .reduce((acc, r) => acc.concat(r.aliases).concat(r.name), [])
  .sort();
console.log(roomsList);
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
      roomsList.map(a => a.toUpperCase()).includes(this.value.toUpperCase())
    ) {
      this.setCustomValidity("");
    } else {
      this.setCustomValidity("I can't find a room with that name.");
    }
  });
});
