// ==UserScript==
// @name         Blackboard Gradebook Scroller
// @namespace    http://luspirko.com/
// @version      0.3
// @description  Improved scrollwheel handling for Blackboard Gradebook.
// @author       Jeff Spirko
// @match        https://*/webapps/gradebook/do/instructor/enterGradeCenter*
// @homepage     https://github.com/Spirko/Spirko-Tampermonkey
// @require      https://cdn.jsdelivr.net/npm/lil-gui@0.15
// @grant        none
// ==/UserScript==

;(function() {
  'use strict';
  let name = "Spirko's Blackboard Gradebook Scroller";
  console.log(name + " startup");

  let tc, tv, th;
  let status = { }
  status.running = true;

  const gui = new lil.GUI({title: 'Blackboard Scoller'});
  gui.add(status, "running").onChange( value => { if (value) setTimeout(doSetup, 500); });

  function doSetup() {
    // console.log(name + " setup");
    // The gradebook table is actually a non-scrollable table with fake scrollbars.
    let tid = document.querySelector('.gbtable').id;
    // Two elements up is the container, but grab it by its id, probably table1_container.
    tc = Array.from(document.querySelector('#' + tid + '_container').children);
    // The container has up to 3 children: viewport, vertical scrollbar, horizontal scrollbar.
    tv = tc[1];
    th = tc[2];
    // Figure out if the existing scrollbar is vertical or horizontal.
    if (!th && tv.style.overflowX == 'scroll') {
      th = tv;
      tv = undefined;
    }
    tc[0].addEventListener('wheel', doScroll, {passive: false});

    if (status.running) setTimeout(doSetup, 1000);
  }
  if (status.running) setTimeout(doSetup, 1000);

  function doScroll(event) {
    if (event.ctrlKey) return; // don't interfere with ctrl-wheel for zooming.

    event.preventDefault();
    // console.log('Scrolling:', event.deltaX, event.deltaY, event.ctrlKey);
    if (!event.shiftKey) {
      if (tv) tv.scrollBy({top: event.deltaY/4})
      if (th) th.scrollBy({left: event.deltaX/4});
    } else {
      if (th) th.scrollBy({left: event.deltaY/4});
    }

  }

})();
