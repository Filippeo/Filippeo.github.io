"use strict";

//selecting elements

const mainTimer = document.getElementById("mainTimer");
const splitTimer = document.getElementById("splitTimer");
const splitTable = document.getElementById("splitTable");
let splitTimes = document.querySelectorAll(".splitTime");
// const splitTimes = document.getElementById("splitTime");
const resetButton = document.getElementById("reset");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const splitButton = document.getElementById("split");

let nowTime, time, timeWhenStopped, stoppedTime, stop, startTime, newSplitTime;
let offsetTime = 0;

const timeStorage = window.localStorage;
readSavedTime();
getTime();

function getTime() {
  nowTime = Date.now();

  if (stop) {
    console.log("stopped");
    stoppedTime = nowTime - startTime - timeWhenStopped;
  } else {
    console.log("live");
  }

  localStorage.setItem("stoppedTime", stoppedTime);

  time = nowTime - startTime - stoppedTime + offsetTime;
  mainTimer.textContent = timerDisplay(time);

  console.log(nowTime);
  console.log(startTime);
  console.log(stoppedTime);
  console.log(timeWhenStopped);
  console.log(offsetTime);
  console.log(stop);
  console.log(timeStorage.stopState);

  window.requestAnimationFrame(getTime);
  return time;
}

startButton.addEventListener("click", start);
resetButton.addEventListener("click", reset);
pauseButton.addEventListener("click", pause);
splitButton.addEventListener("click", split);

window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case " ":
      stop ? start() : pause(); // is it stopped? If yes, start the timer, if not, pause it
      return;
    case "Escape":
      reset();
      return;
  }
});

function start() {
  localStorage.setItem("startTime", startTime);
  stop = false;
  // localStorage.setItem("stopState", stop);
}

function reset() {
  splitTimes = document.querySelectorAll(".splitTime");

  stop = true;
  startTime = Date.now();

  timeWhenStopped = 0;
  localStorage.clear();

  splitTable.innerHTML = `
    <tr>
    <th>split</th>
    <th>time</th>
    </tr>
    `;
  localStorage.setItem("splitTableState", splitTable.innerHTML);
  // for (let i = 0; i < splitTimes.length; i++) {
  //   splitTimes[i].textContent = "";
  //   console.log(splitTimes[i].textContent);
  // }

  if (true /*cell at the left is empty*/) {
    // delete the entire row
  } else if (false /* cell at the left is not empty */) {
    // dont do that}
  }
}

function pause() {
  stop = true;
  timeWhenStopped = time;
  // localStorage.setItem("timeWhenStopped", timeWhenStopped);
  // localStorage.setItem("stopState", stop);
}

function split() {
  newSplitTime = time;
  if (false /*any of the class splittimes cells is ""*/) {
    // fill the first such cell
  } else if (true /*all of the cells are not ""*/) {
    // create new row and fill the cell on the right

    splitTable.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
        <td></td>
        <td class="splitTime">${timerDisplay(newSplitTime)}</td>
      </tr>
      `
    );
  }
  localStorage.setItem("splitTableState", splitTable.innerHTML);
}

// console.log(timeStorage);
// console.log(localStorage.stoppedTime);
// console.log(Boolean("true"));

function readSavedTime() {
  if (timeStorage.startTime) {
    console.log(timeStorage.length);

    // timeWhenStopped = Number(timeStorage.timeWhenStopped);
    startTime = Number(timeStorage.startTime);
    console.log(startTime);
    stoppedTime = Number(timeStorage.stoppedTime);

    // localStorage.setItem("splitTableState", splitTable.innerHTML);
    splitTable.innerHTML = timeStorage.splitTableState;

    // stop = Boolean(timeStorage.stopState);
    console.log(stop);

    return;
  } else {
    timeWhenStopped = 0;
    stop = true;
    startTime = Date.now();

    localStorage.setItem("splitTableState", splitTable.innerHTML);

    return;
  }
}

function timerDisplay(timeInMiliseconds) {
  let h, m, s, ms;
  h = Math.floor(timeInMiliseconds / 1000 / 60 / 60);
  m = Math.floor((timeInMiliseconds / 1000 / 60 / 60 - h) * 60);
  s = Math.floor(((timeInMiliseconds / 1000 / 60 / 60 - h) * 60 - m) * 60);
  ms = Math.floor(
    (((timeInMiliseconds / 1000 / 60 / 60 - h) * 60 - m) * 60 - s) * 100
  );

  ms < 10 ? (ms = `0${ms}`) : (ms = `${ms}`);
  s < 10 ? (s = `0${s}`) : (s = `${s}`);
  m < 10 ? (m = `0${m}`) : (m = `${m}`);
  h < 10 ? (h = `0${h}`) : (h = `${h}`);

  // display adding minute and hour display only when there's any
  if (m < 1) {
    return `${s}:${ms}`;
  } else if (h < 1) {
    return `${m}:${s}:${ms}`;
  } else {
    return `${h}:${m}:${s}:${ms}`;
  }
}
