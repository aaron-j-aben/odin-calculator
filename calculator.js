/**
 * Odin Calculator
 * By Aaron J Aben
 * 
 * Arithmetic calculator with GUI
 */
const MAX_DIGITS = 8;

const btnGrid = document.querySelector('#btn-grid');
const clearBtn = document.querySelector('#clear');
const evalBtn = document.querySelector('#equals');

const operationMapping = {
    'plus': add,
    'minus': subtract,
    'times': multiply,
    'divide': divide,
    'negate': negate,
    'percent': percent
};

let operand1, operand2, operation, shadowOperation;

startCalc();

function startCalc() {
    operand1 = '0', operand2 = null;
    operation = null, shadowOperation = null;
}

/* Display behavior */

/* BUTTON BEHAVIOR */

// = button evaluation behavior
// REMINDER TO DELETE - Evaluation results go to first number, op2 and operator not cleared until C pressed
evalBtn.addEventListener('click', (e) => {
    const nop1 = Number(operand1), nop2 = Number(operand2);
    // Op2 and Oper must both be or neither be null to eval
    if (operand2 !== null & operation !== null){
        let top = nop2, toper = operation;
        operand1 = operate(nop1, nop2, operation).toString();
        operand2 = null;
        operation = null;

        shadowOperation = (x) => { // "Save" prior operation for repeat evaluations
            return toper(x, top);
        };
        console.log(operand1); //temp display behavior
    } else if (operand2 == null && operation == null){
        if (shadowOperation !== null) {
            operand1 = shadowOperation(nop1).toString();
        }
        console.log(operand1); //temp display behavior
    }
});

// Unary Operator Behavior
btnGrid.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('unary')) {
        const unOp = operationMapping[e.target.getAttribute('id')];
        if (operand2 !== null) {
            operand2 = unOp(Number(operand2)).toString();
        } else if (operand1 != 0) {
            operand1 = unOp(Number(operand1)).toString();
        }
    }
});

// Binary Operator Button Behavior
btnGrid.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('binary')) {
        operation = operationMapping[e.target.getAttribute('id')];
    }
});

// AC/Clear Button Behavior
clearBtn.addEventListener('mousedown', (e) => {
    if (operand2 !== null) {
        operand2 = null;
    } else if (operation !== null) {
        operation = null;
    } else {
        shadowOperation = null;
        operand1 = '0';
    }
});

// num button behavior
btnGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('num')) {
        let [numInput, firstOp] = (operation !== null) ? [operand2, false] : [operand1, true];

        const numOfDigits = (numInput !== null) ? numInput.replace(/[-.]/, '').length : 0;
        if (numOfDigits < 8) {
            numInput = (numInput == '0' || numInput == null) ? e.target.value : numInput + e.target.value; 

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
        if (operand2 !== null && !operand2.includes('.')){
            operand2 += '.';
        } else if (!operand1.includes('.')) {
            operand1 += '.';
        }
    }
});


function operate(op1, op2, operation) {
    return operation(op1, op2);
}

/* OPERATION EVALUATION */
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
function negate(x) {
    return -x;
}

function percent(x) {
    return (x / 100);
}