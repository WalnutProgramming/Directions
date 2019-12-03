"use strict";
import { hallways } from "./walnut.js";

import Vue from "vue";
import VueRouter from "vue-router";
import Index from "./IndexV.vue";
import Directions from "./DirectionsV.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Index },
  {
    path: "/directions",
    component: Directions,
    props: route => ({
      fromRoom: route.query.fromRoom,
      toRoom: route.query.toRoom,
    }),
  },
];

const router = new VueRouter({ routes });

const app = new Vue({ router, render: h => h("router-view") }).$mount("#vue");

// // If it's an iOS device, unhide the #iosDownloadSuggestion
// const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
// const isInstalledPWA = window.matchMedia("(display-mode: standalone)").matches;
// if (iOS && !isInstalledPWA) {
//   document.getElementById("iosDownloadSuggestion").style.display = "block";
// }

// check that you input a valid room
// const inputs = document.querySelectorAll(".roomInput");
// inputs.forEach(function(input) {
//   // When the value of the input changes...
//   input.addEventListener("change", function() {
//     // use the setCustomValidity function of the Validation API
//     // to provide an user feedback if the room doesn't exist
//     if (
//       roomsList.map(a => a.toUpperCase()).includes(this.value.toUpperCase())
//     ) {
//       this.setCustomValidity("");
//     } else {
//       this.setCustomValidity("I can't find a room with that name.");
//     }
//   });
// });
