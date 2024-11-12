/**
 * Odin Calculator
 * By Aaron J Aben
 * 
 * Arithmetic calculator with GUI
 */
const MAX_DIGITS = 8;

const btnGrid = document.querySelector('#btn-grid');

let operand1, operand2, operation;
startCalc();

function startCalc() {
    operand1 = 0, operand2 = null;
    operation = null;
}

/* Display behavior */

/* Button behavior */

// = button evaluation behavior
btnGrid.addEventListener('click', (e) => {
    if (e.target.getAttribute('id') == 'equals') {
        // Op2 and Oper must both be or neither be null to eval
        if (operand1 !== null) {
            if (operand2 !== null & operation !== null){
                console.log(operate(operand1, operand2, operation)); //temp display behavior
            } else if (operand2 == null && operation == null){
                console.log(operand1); //temp display behavior
            }
        }
    }
});

// num button behavior
btnGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('num')) {
        let [numInput, firstOp] = (operation !== null) ? [operand2, false] : [operand1, true];

        const numOfDigits = (numInput + '').replace(/[-.]/, '').length;
        if (numOfDigits < 8) {
            numInput = (numInput * 10) + Number(e.target.value);
            
            if (firstOp) {
                operand1 = numInput;
            } else {
                operand2 = numInput;
            }
        }
    }
});

btnGrid.addEventListener('click', (e) => {
    if (e.target.firstChild.nodeName == 'SPAN') {
    }
});

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