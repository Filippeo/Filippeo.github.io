"use strict";

//selecting elements

const mainTimer = document.getElementById("mainTimer");
const splitTimer = document.getElementById("splitTimer");
const splitTable = document.getElementById("splitTable");
const splitTimes = document.querySelectorAll(".splitTime");
// const splitTimes = document.getElementById("splitTime");
const resetButton = document.getElementById("reset");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const splitButton = document.getElementById("split");

let nowTime, time, timeWhenStopped, stoppedTime, stop, startTime, newSplitTime;
let offsetTime = 0;

const timeStorage = window.localStorage;
readSavedTime();
// splitTable.textContent = timeStorage.splitTable;

function getTime() {
  nowTime = Date.now();

  if (stop) {
    console.log("stopped");
    stoppedTime = nowTime - startTime - timeWhenStopped;
    localStorage.setItem("stoppedTime", stoppedTime);
  } else {
    console.log("live");
    localStorage.setItem("stoppedTime", stoppedTime);
  }
  time = nowTime - startTime - stoppedTime + offsetTime;
  mainTimer.textContent = timerDisplay(time);

  // console.log(nowTime);
  // console.log(startTime);
  // console.log(stoppedTime);
  // console.log(offsetTime);
  // console.log(stop);

  window.requestAnimationFrame(getTime);
  return time;
}
getTime();

startButton.addEventListener("click", function () {
  stop = false;
  // localStorage.setItem('stop', stop);
});

resetButton.addEventListener("click", reset);

pauseButton.addEventListener("click", function () {
  stop = true;
  pause();
});

splitButton.addEventListener("click", split);

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

window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case " ":
      stop = !stop;
      pause();
      return;
    case "Escape":
      reset();
      return;
  }
});

function pause() {
  timeWhenStopped = time;
  // localStorage.setItem('stop', stop);
}

function reset() {
  stop = true;
  startTime = Date.now();

  timeWhenStopped = 0;
  localStorage.clear();

  for (let i = 0; i < splitTimes.length; i++) {
    splitTimes[i].textContent = "";
    console.log(splitTimes[i].textContent);
  }
}

function split() {
  newSplitTime = time;
  if (true) {
  } else {
    splitTable.insertAdjacentHTML(
      "beforeend",
      `
    <tr>
      <td>        </td>
      <td class="split">${timerDisplay(newSplitTime)}</td>
    </tr>
  `
    );
  }
  localStorage.setItem("splitTable", splitTable.textContent);
}

console.log(timeStorage);
console.log(localStorage.stoppedTime);
console.log(Boolean("true"));

function readSavedTime() {
  if (timeStorage.length > 1) {
    console.log(timeStorage.length);

    timeWhenStopped = Number(timeStorage.timeWhenStopped);
    startTime = Number(timeStorage.startTime);
    stoppedTime = Number(timeStorage.stoppedTime);

    stop = Boolean(timeStorage.stop);
    return;
  } else {
    timeWhenStopped = 0;
    stop = true;
    startTime = Date.now();
    localStorage.setItem("startTime", startTime);

    return;
  }
}
