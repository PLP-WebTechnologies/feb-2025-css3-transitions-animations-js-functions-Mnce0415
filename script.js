// Element references
const saveBtn = document.getElementById("saveBtn");
const usernameInput = document.getElementById("username");
const usernameDisplay = document.getElementById("username-display");
const box = document.getElementById("box");
const themeToggle = document.getElementById("themeToggle");
const animationSelect = document.getElementById("animationSelect");
const clickSound = document.getElementById("clickSound");

// Available animation classes
const animationClasses = [
  "animate-pop",
  "animate-rotate",
  "animate-shake",
  "animate-bounce",
  "animate-flip",
  "animate-fade"
];

// Display the username
function displayUsername(name) {
  usernameDisplay.textContent = name;
}

// Apply selected theme
function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
}

// Trigger the selected animation
function triggerAnimation(animationType) {
  const animationClass = `animate-${animationType}`;
  box.classList.remove(...animationClasses); // Remove all animations
  void box.offsetWidth; // Reflow to reset animation
  box.classList.add(animationClass);
}

// Play click sound
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// Save user preferences
function savePreferences() {
  const name = usernameInput.value.trim();
  const selectedAnimation = animationSelect.value;

  if (name) {
    localStorage.setItem("userName", name);
    localStorage.setItem("animationType", selectedAnimation);
    displayUsername(name);
    triggerAnimation(selectedAnimation);
    playClickSound();
  }
}

// Toggle and save theme preference
function toggleTheme() {
  const isDark = document.body.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
  playClickSound();
}

// Load preferences from localStorage
function loadPreferences() {
  const savedName = localStorage.getItem("userName");
  const savedTheme = localStorage.getItem("theme") || "light";
  const savedAnimation = localStorage.getItem("animationType") || "pop";

  if (savedName) displayUsername(savedName);
  applyTheme(savedTheme);
  animationSelect.value = savedAnimation;
}

// Event listeners
saveBtn.addEventListener("click", savePreferences);
themeToggle.addEventListener("click", toggleTheme);
window.addEventListener("DOMContentLoaded", loadPreferences);
