// ==UserScript==
// @name         Puzzle Stopwatch
// @version      0.2
// @description  Floating stopwatch to time puzzle solutions.
// @author       You
// @match        https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/*
// @icon         https://www.google.com/s2/favicons?domain=greenend.org.uk
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        none
// ==/UserScript==

// This TamperMonke script adds a working stopwatch in the upper-right corner of
// the window, over the page content.

var $ = window.jQuery;

function myDisplay(id, value) {
  let e = document.createElement('span');
  e.innerHTML = value;
  e.id = id;
  return e;
}

function myButton(name, func) {
  let e = document.createElement('button');
  e.innerHTML = name;
  e.id = name.toLowerCase();
  e.onclick = func;
  return e;
}
function precise_round(num,decimals) {
   return Math.round(num*Math.pow(10, decimals)) / Math.pow(10, decimals);
}

let timerInterval = undefined;
let timerVal = new Date(0);
function incrementTimer() {
  timerVal.setMilliseconds(timerVal.getMilliseconds()+10);
  updateDisplay();
}

function updateDisplay() {
  $('#timerDisplay').html(
    timerVal.toLocaleString(undefined,
                            {minute: 'numeric', second: 'numeric', fractionalSecondDigits: 2}));

  // let minutes = Math.floor(timerVal / 60)
  //   .toLocaleString('en-US');
  // let seconds = (Math.floor(timerVal) % 60)
  //   .toLocaleString('en-US', {minimumIntegerDigits: 2});
  // let hundredths = Math.round(timerVal % 1 * 100)
  //   .toLocaleString('en-US', {minimumIntegerDigits: 2});
  // // console.log(minutes, seconds, hundredths);
  // $('#minutes').html(minutes);
  // $('#seconds').html(seconds);
  // $('#hundredths').html(hundredths);
}

function onStartStop() {
  if (!timerInterval) { // Do start function
    timerInterval = setInterval(incrementTimer, 10);
  } else { // Do stop function
    clearInterval(timerInterval);
    timerInterval = undefined;
  }
}

function onLapReset() {
  if (timerInterval) { // Do nothing, but later implement lap
  } else {
    timerVal = new Date(0); updateDisplay();
  }
}

(function() {
  'use strict';

  console.log('my Tampermonkey script is running.');
  let myDiv = document.createElement('div');
  myDiv.style.position = "fixed";
  myDiv.style.top = 0; myDiv.style.right = 0;
  myDiv.width = 200; myDiv.height = 150;
  myDiv.style.border = "thick solid #ff0000";
  // myDiv.innerHTML = "Hi there.";

  {
    let e = document.createElement('h1');
    e.innerHTML = "My Stopwatch";
    myDiv.appendChild(e);
  }
  {
    let e = document.createElement('p');
    e.align='center';
    e.appendChild(myDisplay('timerDisplay', '00:00.00'));
    // e.appendChild(myDisplay('minutes', '0'));
    // e.appendChild(myDisplay(undefined,':'));
    // e.appendChild(myDisplay('seconds', '00'));
    // e.appendChild(myDisplay(undefined, '.'));
    // e.appendChild(myDisplay('hundredths', '00'));
    myDiv.appendChild(e);
  }

  {
    let e = document.createElement('p');
    e.align='center';
    e.appendChild(myButton('Start/Stop', onStartStop));
    e.appendChild(myButton('Lap/Reset', onLapReset));
    myDiv.appendChild(e);
  }

  document.body.appendChild(myDiv);
})();
