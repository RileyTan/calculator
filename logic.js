const add = (num1, num2) => {
    return num1 + num2;
}

const subtract = (num1, num2) => {
    return num1 - num2;
}

const multiply = (num1, num2) => {
    return num1 * num2;
}

const divide = (num1, num2) => {
    return num1 / num2;
}
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
const mathOperation = document.querySelector("#math-operation");
const resultOnScreen = document.querySelector("#result")
const operators = ["+", "-", "*", "/"];
// initialise array
let targetArray = [] // we want to be able to do targetArray = [], hence "let"

// updateDisplayed() will have to be called everytime the array legitimately changes
const updateDisplay = () => {
    // if there's nothing in the array 
    if (targetArray.length === 0) {
      mathOperation.textContent = 0
      return [0, null, 0]
    }
  
    // find where operator is in the array
    const operatorIndex = targetArray.findIndex(item => operators.includes(item))

    // start slicing - note that join() always yield a string
    let leftPart, rightPart, operator;
    if (operatorIndex === -1) {
        // no operator yet, just show the number
        leftPart = targetArray.join("");
        rightPart = "";
        operator = "";
    } else {
        leftPart = targetArray.slice(0, operatorIndex).join("");
        rightPart = targetArray.slice(operatorIndex + 1).join("");
        operator = targetArray[operatorIndex];
    }

    const expression = `${leftPart} ${operator} ${rightPart}`

    // exhibit on the math-operation <div>
    mathOperation.textContent = expression

    if (operator === "/" && parseFloat(rightPart) === 0) {
      mathOperation.textContent = "No dividing by 0! 🤪"
      return
    } 
    return [parseFloat(leftPart), operator, parseFloat(rightPart)]
}

// #result <div> has to be updated as and when - easier to wrap in a function
const updateResult = (sum) => {
  resultOnScreen.textContent = sum
}

// buttons - they can always be added, no need for checks
numberButtons.forEach(numberButton => {
  numberButton.addEventListener("click", () => {
    targetArray.push(numberButton.value);
    updateDisplay();
  });
});

// operators - this calculator only allows for a pair of numbers, only 1 operator allowed

// if array looks like [5, 3, "+", 5, 3] or [5, ".", 3, "+", 5, ".", 3] and
// when more operators are added, calculate array, display results, clear array and push the results
// into the empty array, push new operator, update display

// operator can only be pushed into array if there's a number
// if array looks like [numOperator],we should pop() the current operator and push the selected operator

operatorButtons.forEach(operatorButton => {
  operatorButton.addEventListener("click", () => {
    const joined = targetArray.join("")
    // array looks like [numOperatornum]
    if (/^\d+\.?\d*[+\-*/]\d+\.?\d*$/.test(joined)) {
      const [left, operator, right] = updateDisplay();
      const result = operate(left, right, operator);
      updateResult(result)
      targetArray = []
      targetArray.push(result)
      targetArray.push(operatorButton.value)
    }
    // array looks like [numOperator]
    else if (/^\d+\.?\d*[+\-*/]$/.test(joined)) {
      targetArray.pop()
      targetArray.push(operatorButton.value)
    }
    // array just has some numbers in it
    else if (targetArray.length > 0) {
      targetArray.push(operatorButton.value)
    }

    else { // array might be empty, but there is always a result
      targetArray.push(resultOnScreen.textContent)
      targetArray.push(operatorButton.value)
    }

    updateDisplay()
  })
})

// decimals
const handleDecimal = () => {
  const last = targetArray[targetArray.length - 1];
  const operators = ["+", "-", "*", "/"];

  // if targetArray is [] or if it looks like [9+]/[9/]/[9-]/[9*] and we are trying to 
  // push a decimal, we need to add a 0 in front to. make it [0.9]/[9+0.9]
  if (targetArray.length === 0 || operators.includes(last)) {
    targetArray.push("0");
    targetArray.push(".");
    updateDisplay(); // to be edited
    return;
  }

  // check current number (everything after last operator) 
  // we confirmed that (targetArray.length === 0 || operators.includes(last)) is not true
  // meaning there's either already some numbers in the array or there's some numbers after 
  // an operator
  let i = targetArray.length - 1;
  let currentNum = "";
  // stop collecting when we bump into an operator 
  while (i >= 0 && !operators.includes(targetArray[i])) {
    currentNum = targetArray[i] + currentNum;
    i--;
  }

  // prevent invalid decimals
  if (currentNum.includes(".")) return;
  if (last === ".") return;

  targetArray.push(".");
  updateDisplay();
};
decimalButton.addEventListener("click", handleDecimal);

// Equal button - array should be wiped clean and result used as first number if another operator is the next button
const equalButton = document.querySelector("#equal")
equalButton.addEventListener("click", () => {
  const joined = targetArray.join("")
  // [numOperatornum]
  if (/^\d*\.?\d+[+\-*/]\d*\.?\d+$/.test(joined)) {
    const [left, operator, right] = updateDisplay()
    const result = operate(left, right, operator)
    updateResult(result)
  }
  else {
    return
  }
})

// AC button
const clearButton = document.querySelector("#clear")
clearButton.addEventListener("click", () => {
    targetArray = []
    mathOperation.textContent = 0
    updateResult(0)
})

// Backspace button
const backspaceButton = document.querySelector("#backspace")
backspaceButton.addEventListener("click", () => {
    if (targetArray.length > 0) {
        targetArray.pop()
    }
    updateDisplay()
})


