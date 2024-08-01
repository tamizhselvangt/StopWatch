let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCount = 0;

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const lapButton = document.getElementById("lap");
const resetButton = document.getElementById("reset");
const lapTimesDiv = document.getElementById("lapTimes");

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    startStopButton.textContent = "Start";
    isRunning = false;
    elapsedTime += Date.now() - startTime;
  } else {
    startTime = Date.now();
    timer = setInterval(updateDisplay, 10);
    startStopButton.textContent = "Stop";
    isRunning = true;
  }
}

function lap() {
  if (isRunning) {
    lapCount++;
    const lapTime = formatTime(elapsedTime + Date.now() - startTime);
    const lapItem = document.createElement("div");
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapTimesDiv.appendChild(lapItem);
  }
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  lapCount = 0;
  display.textContent = "00:00:00";
  startStopButton.textContent = "Start";
  lapTimesDiv.innerHTML = "";
}

function updateDisplay() {
  const currentTime = elapsedTime + Date.now() - startTime;
  display.textContent = formatTime(currentTime);
}

function formatTime(time) {
  const date = new Date(time);
  return date.toISOString().substr(11, 8);
}

startStopButton.addEventListener("click", startStop);
lapButton.addEventListener("click", lap);
resetButton.addEventListener("click", reset);
