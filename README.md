# Calculator
Available at https://rileytan.github.io/calculator/

This is a calculator that evaluates a single pair of numbers at a time.
It currently does not support negative values.

I centered everything around an array which helped me divide the project into 2 parts which is the input of the array and output of the array. 

Compartmentalising the project into these 2 components helped me create more modular code which were easier to debug.

## Input into the array 
There are 6 categories of buttons:
1. Numbers
Numbers needed no special consideration and were allowed to be added into the array anytime. 
2. Operators
Keeping true to the project requirement of evaluating a single pair of numbers, regex was used to make sure that the screen never showed operations like 3 + 3 + 3 and instead 6 will be used automatically as part of the next operation 6 + 3

If a wrong operator is selected, users can change their operator without having to backspace by simply selecting another operator. 

Users can also start their calculations by pressing any operator, 0 will be used as the number on the left. 
3. Decimal
If users start a number with a decimal, an extra 0 is added in front. 

Users are unable to create numbers with multiple decimals.
4. Equals
Only available when a viable operation is written.
5. AC
6. Backspace 

## Output of the array
There are 3 extra main functions. 

displayResult(sum) relied on operate() and operate replied on the returned floats of updateDisplay(). updateDisplay() relied on the array by joining and slicing away the 2 numbers around an operator.


