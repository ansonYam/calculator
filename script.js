let queue = []; // queue will store just running total + next operation

const display = document.querySelector('#display'); // locate the display

const numberButtons = document.querySelectorAll('.number-btn'); // locate all number buttons
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener('click', () => {
        display.innerText += numberButton.innerText;
    })
});

// pressing an operation button 'locks in' the number in the display
const queueDisplay = document.querySelector('#queue'); // we can optionally show the queued value + operation

// TODO: handle other 'out-of-order' sequences (how about starting with an operation and no value?)
const operatorButtons = document.querySelectorAll('.operator-btn');
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', () => {
        let displayValue = parseInt(display.innerText); // lock in whatever is in the display (might be nothing)        
        let chosenOperation = operatorButton.id; // note down the chosen operation
        display.innerText = ''; // we've noted things down, can empty the display now 

        if (isNaN(displayValue)) { // if we pressed an operation without any value, just update the operation and move on
            queue.operation = chosenOperation;
            queueDisplay.innerText = Math.round(queue.value * 1000)/1000 + ", " + queue.operation;
            return;
        }

        if (chosenOperation === 'equals') {
            if (!('operation' in queue)) {
                console.log('we are here!');
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
            console.log('pushing new value and new operation');
            queue.value = displayValue;
            queue.operation = chosenOperation;
        }    
        console.log(queue);
        queueDisplay.innerText = Math.round(queue.value * 1000)/1000 + ", " + queue.operation;
    })
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    queue = [];
    queueDisplay.innerText = queue.value + ", " + queue.operation;
    display.innerText = '';
});

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