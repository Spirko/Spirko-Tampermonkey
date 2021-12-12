// ==UserScript==
// @name         Blackboard Gradebook Scroller
// @namespace    http://luspirko.com/
// @version      0.1
// @description  Improved scrollwheel handling for Blackboard Gradebook.
// @author       Jeff Spirko
// @match        https://*/webapps/gradebook/do/instructor/enterGradeCenter*
// @grant        none
// @run-at       context-menu
// ==/UserScript==

(function() {
  'use strict';
  console.log("ImpatientProf's Blackboard Gradebook Scroller");

  // The gradebook table is actually a non-scrollable table with fake scrollbars.
  let t = document.querySelector('.gbtable');
  // Two elements up is the container, but grab it by its id, probably table1_container.
  let tc = document.querySelector('#' + t.id + '_container');
  // The container has up to 3 children: viewport, vertical scrollbar, horizontal scrollbar.
  let tv = tc.children[1];
  let th = tc.children[2];
  // Figure out if the existing scrollbar is vertical or horizontal.
  if (!th && tv.style.overflowX == 'scroll') {
    th = tv;
    tv = undefined;
  }

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
  t.addEventListener('wheel', doScroll);

})();
