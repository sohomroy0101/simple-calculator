const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const themeToggle = document.getElementById("theme-toggle");

let currentInput = "";

const operators = ['+', '-', '*', '/'];

function updateDisplay() {
  display.value = currentInput;
}

function isOperator(char) {
  return operators.includes(char);
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "=") {
      try {
        // Prevent eval on invalid input
        if (!currentInput || isOperator(currentInput.slice(-1))) {
          display.value = "Error";
          currentInput = "";
        } else {
          currentInput = eval(currentInput).toString();
          updateDisplay();
        }
      } catch {
        display.value = "Error";
        currentInput = "";
      }
    } else if (value === "C") {
      currentInput = "";
      updateDisplay();
    } else {
      // Prevent double operators
      const lastChar = currentInput.slice(-1);
      if (isOperator(value) && isOperator(lastChar)) {
        currentInput = currentInput.slice(0, -1) + value;
      } else {
        currentInput += value;
      }
      updateDisplay();
    }
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if ((/\d/).test(key) || key === "." || operators.includes(key)) {
    const lastChar = currentInput.slice(-1);
    if (isOperator(key) && isOperator(lastChar)) {
      currentInput = currentInput.slice(0, -1) + key;
    } else {
      currentInput += key;
    }
    updateDisplay();
  } else if (key === "Enter") {
    e.preventDefault();
    try {
      if (!currentInput || isOperator(currentInput.slice(-1))) {
        display.value = "Error";
        currentInput = "";
      } else {
        currentInput = eval(currentInput).toString();
        updateDisplay();
      }
    } catch {
      display.value = "Error";
      currentInput = "";
    }
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  } else if (key.toLowerCase() === "c") {
    currentInput = "";
    updateDisplay();
  }
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});