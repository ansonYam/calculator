let queue = []; // queue will store just running total + next operation

const display = document.querySelector('#display'); // locate the display

const numberButtons = document.querySelectorAll('.number-btn'); // locate all number buttons
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener('click', () => {
        display.innerText += numberButton.innerText;
    })
})

// decimal event listener. Should only be allowed once
const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', () => addDecimal());

// keyboard support
window.addEventListener('keydown', (event) => {
    if (event.key >= 0 && event.key <= 9) display.innerText += event.key;
    if (event.key === '.') addDecimal();
    if (event.key === '=' || event.key === 'Enter') operatorFunction('equals');
    if (event.key === 'Backspace') backSpace();
    if (event.key === '+') operatorFunction('add');
    if (event.key === '-') operatorFunction('subtract');
    if (event.key === '*') operatorFunction('multiply');
    if (event.key === '/') operatorFunction('divide');

})

// helper function for adding decimals
function addDecimal() {
    if (display.innerText.length >= 1 && !(display.innerText.includes('.'))) {
        display.innerText += '.';
    }
}

// helper function for deleting just one digit
function backSpace() {
    display.innerText = display.innerText.slice(0,-1);
}

function operatorFunction(chosenOperation) {
    let displayValue = parseFloat(display.innerText); // lock in whatever is in the display (might be nothing)        
    display.innerText = ''; // we've noted things down, can empty the display now 

    if (isNaN(displayValue)) { // if we pressed an operation without any value, just update the operation and move on
        queue.operation = chosenOperation;
        queueDisplay.innerText = Math.round(queue.value * 1000)/1000 + ", " + queue.operation;
        return;
    }

    if (chosenOperation === 'equals') {
        if (!('operation' in queue)) {
            queue.value = displayValue;
        } else {
            let newValue = operate(queue.operation, queue.value, displayValue); 
            queue = []; // empty the queue
            queue.value = newValue; // only push the new value, no operation here    
        }
        queueDisplay.innerText = Math.round(queue.value * 1000)/1000;
        return;
    }

    if ('value' in queue && 'operation' in queue) {
        let newValue = operate(queue.operation, queue.value, displayValue);
        queue.value = newValue;    
        queue.operation = chosenOperation;
    } else {
        queue.value = displayValue;
        queue.operation = chosenOperation;
    }    
    queueDisplay.innerText = Math.round(queue.value * 1000)/1000 + ", " + queue.operation;
}

// pressing an operation button 'locks in' the number in the display
const queueDisplay = document.querySelector('#queue'); // we can show the queued value + operation
const operatorButtons = document.querySelectorAll('.operator-btn');
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', (event) => operatorFunction(event.target.id));
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    queue = [];
    queueDisplay.innerText = queue.value + ", " + queue.operation;
    display.innerText = '';
})

const deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', () => backSpace());

function operate(operator, a, b) {
    switch(operator) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
        default:
            return 'Something went wrong';
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return 'How dare you! >:(';
    return a / b;
}