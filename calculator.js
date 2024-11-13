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
const disp = document.querySelector('#results-text');
const dispParity = document.querySelector('#parity');

const operationMapping = {
    'plus': add,
    'minus': subtract,
    'times': multiply,
    'divide': divide,
    'negate': negate,
    'percent': percent
};

const operNodes = document.querySelectorAll('.col4');

let operand1, operand2, operation, shadowOperation;

startCalc();

function startCalc() {
    operand1 = '0', operand2 = null;
    operation = null, shadowOperation = null;
    evalBtn.disabled = false;
}

/* DISPLAY BEHAVIOR */
function updateDisplay(numStr) {
    if (isNaN(Number(isNaN))) {
        disp.textContent = numStr;
        return;
    }

    const num = Number(numStr)
    let maxPlaces = (Number.isInteger(num)) ? MAX_DIGITS : MAX_DIGITS + 1;
    const [startInd, parityStr] = (num >= 0) ? [0, ''] : (maxPlaces++, [1, '-']);

    disp.textContent = numStr.slice(startInd, maxPlaces);
    dispParity.textContent = parityStr;
}

/* BUTTON BEHAVIOR */

// = button evaluation behavior
// REMINDER TO DELETE - Evaluation results go to first number, op2 and operator not cleared until C pressed
evalBtn.addEventListener('click', evalEventHandler);

// Unary Operator Behavior
btnGrid.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('unary')) {
        const unOp = operationMapping[e.target.getAttribute('id')];
        if (operand2 !== null) {
            operand2 = unOp(Number(operand2)).toString();
            updateDisplay(operand2);
        } else if (operand1 != 0) {
            operand1 = unOp(Number(operand1)).toString();
            updateDisplay(operand1);
        }
    }
});

// Binary Operator Button Behavior
btnGrid.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('binary')) {
        if (operand2 !== null) {
            evalEventHandler(e);
        }
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

    for (const operBtn of operNodes) {
        operBtn.disabled = false;
    }

    updateDisplay(operand1);
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
                updateDisplay(operand1);
            } else {
                operand2 = numInput;
                updateDisplay(operand2);
            }
        }
    }
});

// dot/decimal point button behavior
btnGrid.addEventListener('click', (e) => {
    if (e.target.getAttribute('id') == 'dot') {
        if (operand2 !== null && !operand2.includes('.')){
            operand2 += '.';
            updateDisplay(operand2);
        } else if (!operand1.includes('.')) {
            operand1 += '.';
            updateDisplay(operand1);
        }
    }
});

function evalEventHandler(e) {
    const nop1 = Number(operand1), nop2 = Number(operand2);

    // Op2 and Oper must both be or neither be null to eval
    if (operand2 !== null & operation !== null){
        let top = nop2, toper = operation;
        const result = operate(nop1, nop2, operation);
        
        if (result === null) {
            for (const operBtn of operNodes) {
                operBtn.disabled = false;
            }
            updateDisplay('Err');
            return;
        }
        
        operand1 = result.toString();
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

    const op1Digits = operand1.replace(/[-.]/, '').length;

    if (op1Digits > 8) {
        updateDisplay('Err');

        for (const operBtn of operNodes) {
            operBtn.disabled = true;
        }
    } else {
        updateDisplay(operand1);
    }
}

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