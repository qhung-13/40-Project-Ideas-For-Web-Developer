type Operator = "÷" | "×" | "−" | "+" | null;

const screenDisplay = document.querySelector(".screen") as HTMLElement;
const buttons = document.querySelectorAll(".calc-button");

let currentOperand: string = "0";
let previousOperand: string = "";
let operation: Operator = null;
let shouldResetScreen: boolean = false; 

function clearAll(): void {
  currentOperand = "0";
  previousOperand = "";
  operation = null;
  shouldResetScreen = false;
}

function deleteLast(): void {
  if (currentOperand === "0") return;
  if (currentOperand.length === 1) {
    currentOperand = "0";
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
}

function appendNumber(num: string): void {
  if (shouldResetScreen) {
    currentOperand = "";
    shouldResetScreen = false;
  }

  const actualNum = num === "·" || num === "̇" || num === "." ? "." : num;

  if (actualNum === "." && currentOperand.includes(".")) return;

  if (currentOperand === "0" && actualNum !== ".") {
    currentOperand = actualNum;
  } else {
    currentOperand += actualNum;
  }
}

function handleOperation(op: Operator): void {
  if (currentOperand === "") return;

  if (previousOperand !== "") {
    calculate();
  }

  operation = op;
  previousOperand = currentOperand;
  shouldResetScreen = true; 
}

function calculate(): void {
  let result: number;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "−": 
      result = prev - current;
      break;
    case "×": 
      result = prev * current;
      break;
    case "÷": 
      if (current === 0) {
        alert("Không thể chia cho 0 bạn ơi!");
        clearAll();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentOperand = result.toString();
  operation = null;
  previousOperand = "";
  shouldResetScreen = true; 
}

function updateDisplay(): void {
  screenDisplay.innerText = currentOperand;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const btnText = (button as HTMLButtonElement).innerText.trim();

    switch (btnText) {
      case "C":
        clearAll();
        break;
      case "←": 
        deleteLast();
        break;
      case "=": 
        calculate();
        break;
      case "÷":
      case "×":
      case "−":
      case "+":
        handleOperation(btnText as Operator);
        break;
      default:
        appendNumber(btnText);
        break;
    }

    updateDisplay();
  });
});

updateDisplay();
