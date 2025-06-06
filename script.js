// Variable declarations
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

// DOM elements
const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");

// Function to format time in HH:MM:SS
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Update the display in real-time
function updateDisplay() {
  const currentTime = Date.now();
  const diff = currentTime - startTime + elapsedTime;
  display.textContent = formatTime(diff);
}

// Start or pause the stopwatch
startStopBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 1000);
    startStopBtn.textContent = "Pause";
    isRunning = true;
  } else {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    startStopBtn.textContent = "Start";
    isRunning = false;
  }
});

// Reset everything
resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00";
  startStopBtn.textContent = "Start";
  lapsContainer.innerHTML = ""; // Clear all lap records
});

// Save current time as lap
lapBtn.addEventListener("click", () => {
  if (isRunning) {
    const currentTime = Date.now();
    const diff = currentTime - startTime + elapsedTime;
    const lapTime = formatTime(diff);
    
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
    lapsContainer.appendChild(lapItem);
  }
});
