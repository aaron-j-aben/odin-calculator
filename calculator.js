/**
 * Odin Calculator
 * By Aaron J Aben
 * 
 * Arithmetic calculator with GUI
 */
const MAX_DIGITS = 8;

const btnGrid = document.querySelector('#btn-grid');

let operand1, operand2, decimalModifier, operation, shadowOperation;
startCalc();

function startCalc() {
    operand1 = 0, operand2 = null, decimalModifier = 1;
    operation = null, shadowOperation = null;
}

/* Display behavior */

/* Button behavior */

// = button evaluation behavior
// REMINDER TO DELETE - Evaluation results go to first number, op2 and operator not cleared until C pressed
btnGrid.addEventListener('click', (e) => {
    if (e.target.getAttribute('id') == 'equals') {
        // Op2 and Oper must both be or neither be null to eval
        if (operand2 !== null & operation !== null){
            let top = operand2, toper = operation;
            operand1 = operate(operand1, operand2, operation);
            shadowOperation = (x) => { // "Save" prior operation for repeat evaluations
                return toper(x, top);
            };
            console.log(operand1); //temp display behavior
        } else if (operand2 == null && operation == null){
            if (shadowOperation !== null) {
                operand1 = shadowOperation(operand1);
            }
            console.log(operand1); //temp display behavior
        }
    }
});

// AC/Clear Button Behavior
btnGrid.addEventListener('mousedown', (e) => {
    if (e.target.getAttribute('id') == 'clear') {
        decimalModifier = 1;

        if (operand2 !== null) {
            operand2 = null;
        } else if (operation !== null) {
            operation = null;
        } else {
            shadowOperation = null;
            operand1 = 0;
        }
    }
});

// num button behavior
btnGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('num')) {
        let [numInput, firstOp] = (operation !== null) ? [operand2, false] : [operand1, true];

        const numOfDigits = (numInput !== null) ? (numInput + '').replace(/[-.]/, '').length : 0;
        if (numOfDigits < 8) {
            if (decimalModifier < 1) {
                numInput = numInput + (Number(e.target.value) * decimalModifier);
                decimalModifier /= 10;
            } else {
                numInput = numInput * 10 + Number(e.target.value);
            }

            console.log(numInput);
            
            if (firstOp) {
                operand1 = numInput;
            } else {
                operand2 = numInput;
            }
        }
    }
});

// dot/decimal point button behavior
btnGrid.addEventListener('click', (e) => {
    if (e.target.getAttribute('id') == 'dot') {
        if (Number.isInteger(operand2) || Number.isInteger(operand1)) {
            decimalModifier = 0.1;
        }
    }
});


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

// Unary operations
function negate(x, y) {
    return (y == null) ? (-x) : (-y);
}

function percent(x, y) {
    return (x / 100);
}