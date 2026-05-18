const screenDisplay = document.querySelector(".screen");
const buttons = document.querySelectorAll(".calc-button");
let currentOperand = "0";
let previousOperand = "";
let operation = null;
let shouldResetScreen = false;
// 4. Các hàm xử lý Logic
function clearAll() {
    currentOperand = "0";
    previousOperand = "";
    operation = null;
    shouldResetScreen = false;
}
function deleteLast() {
    if (currentOperand === "0")
        return;
    if (currentOperand.length === 1) {
        currentOperand = "0";
    }
    else {
        currentOperand = currentOperand.slice(0, -1);
    }
}
function appendNumber(num) {
    if (shouldResetScreen) {
        currentOperand = "";
        shouldResetScreen = false;
    }
    const actualNum = num === "·" || num === "̇" || num === "." ? "." : num;
    if (actualNum === "." && currentOperand.includes("."))
        return;
    if (currentOperand === "0" && actualNum !== ".") {
        currentOperand = actualNum;
    }
    else {
        currentOperand += actualNum;
    }
}
function handleOperation(op) {
    if (currentOperand === "")
        return;
    if (previousOperand !== "") {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    shouldResetScreen = true;
}
function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current))
        return;
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
function updateDisplay() {
    screenDisplay.innerText = currentOperand;
}
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const btnText = button.innerText.trim();
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
                handleOperation(btnText);
                break;
            default:
                appendNumber(btnText);
                break;
        }
        updateDisplay();
    });
});
updateDisplay();
export {};
//# sourceMappingURL=index.js.map