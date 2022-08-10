// ==UserScript==
// @name         Banner Schedule Improvements
// @namespace    http://luspirko.com/
// @version      0.2
// @description  Visual and Functional tweaks to TAMUCC public schedule.
// @author       Jeff Spirko
// @match        https://banner.tamucc.edu/schedule/BPROD.php
// @homepage     https://github.com/Spirko/Spirko-Tampermonkey
// @require      https://cdn.jsdelivr.net/npm/lil-gui@0.15
// @grant        none
// @run-at       context-menu
// ==/UserScript==

;(function() {
  'use strict';
  
  console.log(`Loaded Spirko's banner-schedule.js`);

  for (let e of document.querySelectorAll('.spirko')) { e.remove(); }

  let table = document.querySelectorAll('table');
  let headRow = document.querySelector('table tr');
  for (let e of headRow.children) {
    let br = document.createElement('br');
    e.appendChild(br);
    let b = document.createElement('span');
    b.innerText = '−';
    b.style.padding = '2px';
    b.style.borderRadius = '10px';
    b.style.backgroundColor = 'lightblue';
    b.style.height = '20px';
    b.style.width = '20px';
    b.classList.add('spirko');
    e.appendChild(b);
  }
})()
