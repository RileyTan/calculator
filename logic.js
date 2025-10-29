import {add, subtract, multiply, divide} from "./math-helpers"

// calling operate(1, 2, '+') returns 3 and will change depending on operator
const operate = (num1, num2, operator) => {
    if (operator === '+') {
        return add(num1, num2)
    }
    else if (operator === '-') {
        return subtract(num1, num2)
    }
    else if (operator === '*') {
        return multiply(num1, num2)
    }
    else if (operator === '/') {
        return divide(num1, num2)
    }
}

// categories of buttons
const numberButtons = document.querySelectorAll(".number");
const decimalButton = document.querySelector("#decimal")
const operatorButtons = document.querySelectorAll(".operator")

// initialise array
let targetArray = [] // we want to be able to do targetArray = [], hence "let"

// updateDisplayed() will have to be called everytime the array legitimately changes
const updateDisplay = () => {
    // find where operator is in the array
    const operatorIndex = targetArray.findIndex(item => operators.includes(item))

    // start slicing - note that join() always yield a string
    const leftPart = targetArray.slice(0, operatorIndex).join("") // "53"
    const rightPart = targetArray.slice(operatorIndex + 1).join("") // "53" 
    const operator = targetArray[operatorIndex]

    const expression = `${leftPart} ${operator} ${rightPart}`

    // exhibit on the math-operation <div>
    const mathOperation = document.querySelector("#math-operation")
    mathOperation.textContent = expression

    return parseInt(leftPart), operator, parseInt(rightPart)
}

// buttons - they can always be added, no need for checks
numberButtons.forEach(numberButton => {
  numberButton.addEventListener("click", () => {
    targetArray.push(numberButton.textContent);
    updateDisplay();
  });
});

// operators - this calculator only allows for a pair of numbers, only 1 operator allowed
// if array looks like [5, 3, "+", 5, 3] or [5, ".", 3, "+", 5, ".", 3] and
// when more operators are added, calculate array, display results, clear array and push the results
// into the empty array
// operator can only be pushed into array if there's a number, if the array looks like
// [numOperatornum], we should call operate(), push results, then push operate again
// if array looks like [numOperator],we should pop() the current operator and push the selected operator
const operators = ["+", "-", "*", "/"];



export const handleDecimal = () => {
  const last = targetArray[targetArray.length - 1];

  // 1️⃣ Starting a new number or after an operator
  if (targetArray.length === 0 || operators.includes(last)) {
    targetArray.push("0", ".");
    updateDisplay();
    return;
  }

  // 2️⃣ Prevent multiple decimals in the current number
  let i = targetArray.length - 1;
  let currentNum = "";
  while (i >= 0 && !operators.includes(targetArray[i])) {
    currentNum = targetArray[i] + currentNum;
    i--;
  }

  if (currentNum.includes(".")) return; // already has a dot
  if (last === ".") return; // prevent double dot

  // 3️⃣ Otherwise, append decimal
  targetArray.push(".");
  updateDisplay();
};

// Attach the event listener
decimalButton.addEventListener("click", handleDecimal);

// only updateResult() when pressing the equal button if the array looks like [numOperatornum]

// one function to delete numbers from array
const backspaceButton = document.querySelector("#backspace")
backspaceButton.addEventListener("click", () => {
    if (targetArray.length > 0) {
        targetArray.pop()
    }
    updateDisplay()
    updateResult()
})

// one function to calculate
// one function to listen out for equal sign - array should be wiped clean and result used as first number 

// code to clear all in array, clear the math operation <div> and result div
const result = document.querySelector("#result")
const clearButton = document.querySelector("#clear")
clearButton.addEventListener("click", () => {
    targetArray = []
    mathOperation.textContent = ""
    result.textContent = ""
})

// one function to display the array values - assume that the array is currently only 
// [numOperatornum] example targetArray = [5, 3, "+", 5, 3];


// IF WE PRESS EQUAL
// CALL OPERATE(), DON'T NEED TO EMPTY THE TARGET ARRAY, JUST DISPLAY THE RESULTS, DON'T NEED TO UPDATE DISPLAY



