import {add, subtract, multiply, divide} from "./math-helpers"
import { handleDecimal } from "./regex-helpers"
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

    return [parseInt(leftPart), operator, parseInt(rightPart)]
}

// #result <div> has to be updated as and when - easier to wrap in a function
const updateResult = (sum) => {
  const resultOnScreen = document.querySelector("#result")
  resultOnScreen.textContent = sum
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
// into the empty array, push new operator, update display

// operator can only be pushed into array if there's a number
// if array looks like [numOperator],we should pop() the current operator and push the selected operator
operatorButtons.forEach(operatorButton => {
  operatorButton.addEventListener("click", () => {
    const joined = targetArray.join("")
    // array looks like [numOperatornum]
    if (/^\d*\.?\d+[+\-*/]\d*\.?\d+$/.test(joined)) {
      const [left, operator, right] = updateDisplay();
      const result = operate(left, right, operator);
      updateResult(result)
      targetArray = []
      targetArray.push(result)
      targetArray.push(operatorButton.textContent)
    }
    // array looks like [numOperator]
    else if (/^\d*\.?\d+[+\-*/]$/.test(joined)) {
      targetArray.pop()
      targetArray.push(operatorButton.textContent)
    }
    // array just has some numbers in it
    else if (targetArray.length > 0) {
      targetArray.push(operatorButton.textContent)
    }

    else { // array might be empty, in which case do nothing
      return
    }
    updateDisplay()
  })
})

// decimals 
decimalButton.addEventListener("click", handleDecimal);

// AC button
const result = document.querySelector("#result")
const clearButton = document.querySelector("#clear")
clearButton.addEventListener("click", () => {
    targetArray = []
    mathOperation.textContent = ""
    result.textContent = ""
})


// Backspace button
const backspaceButton = document.querySelector("#backspace")
backspaceButton.addEventListener("click", () => {
    if (targetArray.length > 0) {
        targetArray.pop()
    }
    updateDisplay()
    updateResult()
})
decimalButton.addEventListener("click", () => {
  handleDecimal()
})

// one function to calculate
// one function to listen out for equal sign - array should be wiped clean and result used as first number 

// one function to display the array values - assume that the array is currently only 
// [numOperatornum] example targetArray = [5, 3, "+", 5, 3];


// IF WE PRESS EQUAL
// CALL OPERATE(), DON'T NEED TO EMPTY THE TARGET ARRAY, JUST DISPLAY THE RESULTS, DON'T NEED TO UPDATE DISPLAY



