// ==UserScript==
// @name         Lowes in-store checkbox
// @namespace    http://luspirko.com/
// @version      0.2
// @description  Look for and select the in-store checkbox on Lowes.com.
// @author       You
// @match        https://www.lowes.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lowes.com
// @updateURL    https://raw.githubusercontent.com/Spirko/Spirko-Tampermonkey/main/lowes-instore.js
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  function findCheckbox() {
    let c = document.querySelector('[name=instockstorepickup]');

    if (!c) {
      // console.log("not found yet");
      setTimeout(findCheckbox, 1000);
      return;
    }

    if (c.value === 'false') {
      console.log("In-store not selected.  Clicking.");
      c.click();
    } else {
      console.log("In-store already selected.");
    }
  }

  setTimeout(findCheckbox, 1000);


})();
