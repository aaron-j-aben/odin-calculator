/**
 * Odin Calculator
 * By Aaron J Aben
 * 
 * Arithmetic calculator with GUI
 */
let operand1, operand2, operation, canEval;
startCalc();

function startCalc() {
    operand1 = 0, operand2 = null;
    operation = null;
    canEval = true;
}

/* Display behavior */

/* Button behavior */

/**
 * 
 * @param {number} op1 
 * @param {number} op2 
 * @param {object} operation
 */
function operate(op1, op2, operation) {
    return operation(op1, op2);
}

/* Basic Operations with any number type */
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(dividend, divisor) {
    if (divisor === 0) {
        return null;
    }

    return dividend / divisor;
}

function negate(x, y) {
    return (-x);
}