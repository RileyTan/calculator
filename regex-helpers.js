export const handleDecimal = () => {
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
