const numbers = document.querySelectorAll('.number'),
      operatorBtns = document.querySelectorAll('.operator'),
      clearBtns = document.querySelectorAll('.clear-btn'),
      decimalBtn = document.getElementById('decimal'),
      display = document.getElementById('display'),
      squareRootBtn = document.getElementById('square-root'),
      percentBtn = document.getElementById('percent'),
      factorialBtn = document.getElementById('factorial'),
      squareBtn = document.getElementById('square'),
      instructionBtn = document.getElementById('instruction');
let MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPandingOperation = '';

for(let i = 0; i < numbers.length; i++){
    let number = numbers[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.textContent)
    })
};

for(let i = 0; i < operatorBtns.length; i++){
    let operatorBtn = operatorBtns[i];
    operatorBtn.addEventListener('click', function (e) {
        operation(e.target.textContent)
    })
};

for(let i = 0; i < clearBtns.length; i++){
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function(e) {
        clear(e.target.textContent)
    })
};

decimalBtn.addEventListener('click', decimal);   
squareRootBtn.addEventListener('click', squareRoot);
percentBtn.addEventListener('click', percent);
factorialBtn.addEventListener('click', factorial);
squareBtn.addEventListener('click', square);
instructionBtn.addEventListener('click', instruction);

function instruction(params) {
    alert(`Инструкция
    - Отрицательное число: нажмите знак "-" и вводите число;

    - DEL: стирает последнюю цифру числа, работает как "BackSpace";

    - √: введите число и нажмите "√", на дисплее появится результат;

    - %: введите число, выберете операцию (сложение, вычитание и т.д.), снова введите число(это уже будут проценты) и нажмите знак "%" - на дисплее отразится рассчитанный процент, а затем нажмите "=" или другую операцию, и будет произведено вычисление;

    - !n: введите число и нажмите "!n", на дисплее появится результат;

    - X²: введите число и нажмите "X²", на дисплее появится результат;

    - X^: работает как и обычная операция (сложение, вычитание и т.д.), просто введите число, нажмите "X^", введите ещё число (которое укажет нужную степень), а затем нажмите "=" или другую операцию, и будет произведено вычисление;
    `)
}

function numberPress(number) {
    if(MemoryPandingOperation === '='){
        display.value = number;
        MemoryNewNumber = false;
        MemoryCurrentNumber = 0;
        MemoryPandingOperation = '';
    } else {
        if(MemoryNewNumber) {
            display.value = number;
            MemoryNewNumber = false;
        } else {
            if(display.value === '0'){
                display.value = number;
            } else {
                display.value += number;
            }
        }
    }
    
}

function operation(op) {
    if(op === '-' && display.value == 0){
        if(MemoryPandingOperation === '='){
            display.value = '-';
            MemoryNewNumber = false;
            MemoryCurrentNumber = 0;
            MemoryPandingOperation = '';
        } else {
            display.value = '-';
            MemoryNewNumber = false;
        };
    } else {
        if(MemoryCurrentNumber === 0){
            MemoryCurrentNumber = +display.value;
            display.value = '0';
        } else {
            MemoryNewNumber = true;
            if(MemoryPandingOperation === '+'){
                MemoryCurrentNumber = MemoryCurrentNumber + +display.value;
                display.value = +MemoryCurrentNumber.toFixed(7);
                MemoryPandingOperation = '';
            } else if(MemoryPandingOperation === '-'){
                MemoryCurrentNumber = MemoryCurrentNumber - +display.value;
                display.value = +MemoryCurrentNumber.toFixed(7);
                MemoryPandingOperation = '';
            } else if(MemoryPandingOperation === '*'){
                MemoryCurrentNumber = MemoryCurrentNumber * +display.value;
                display.value = +MemoryCurrentNumber.toFixed(7);
                MemoryPandingOperation = '';
            } else if(MemoryPandingOperation === '/'){
                MemoryCurrentNumber = MemoryCurrentNumber / +display.value;
                    if(MemoryCurrentNumber === Infinity){
                        display.value = 'Ах ты ж хулюган!';
                    } else {
                    display.value = +MemoryCurrentNumber.toFixed(7);
                    MemoryPandingOperation = '';
                    }
            } else if(MemoryPandingOperation === 'X^'){
                MemoryCurrentNumber = MemoryCurrentNumber ** +display.value;
                display.value = +MemoryCurrentNumber.toFixed(7);
                MemoryPandingOperation = '';
            } else if(op === '=' && MemoryPandingOperation === '='){
                MemoryCurrentNumber = 0;
                display.value = '0';
            } else {
                display.value = '0';
            }
        } 
    
        MemoryPandingOperation = op;
    }
}

function decimal(params) {
    let localDecimalMemory = display.value;
    
    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if(localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
        
    }
    display.value = localDecimalMemory; 
} 

function squareRoot(params) {
    if(display.value < 0){
        display.value = 'Это фиаско, Братан!';
    } else {
        if(MemoryPandingOperation === '=' || (MemoryCurrentNumber !== 0 && MemoryPandingOperation === '')){
            MemoryCurrentNumber = Math.sqrt(display.value);
            display.value = MemoryCurrentNumber;
            MemoryPandingOperation = '';
        } else {
            display.value = Math.sqrt(display.value);
            MemoryNewNumber = true;
        }
    }
}

function percent (params) {
    display.value = (MemoryCurrentNumber / 100) * Number(display.value) ;
}

function factorial(){
    if(display.value < 0 || display.value > 15){
        alert('Введите число от 0 до 15');
    } else if(MemoryPandingOperation === '=' || (MemoryCurrentNumber !== 0 && MemoryPandingOperation === '')){
        if(display.value == 0){
            MemoryCurrentNumber = 1;
            display.value = MemoryCurrentNumber;
            MemoryNewNumber = true;
            MemoryPandingOperation = '';
        } else {
        let fact = 1;
            for(let i = display.value; i > 0; i--) {
          fact *= i
        }
        MemoryCurrentNumber = fact
        display.value  = MemoryCurrentNumber;
        MemoryNewNumber = true;
        MemoryPandingOperation = '';
        }
    } else {
        if(display.value == 0){
            display.value = 1;
            MemoryNewNumber = true;
        } else {
        let fact = 1;
            for(let i = display.value; i > 0; i--) {
          fact *= i
        }
        display.value  = fact;
        MemoryNewNumber = true;
        }        
    } 
    
}

function square(params) {
    if(MemoryPandingOperation === '=' || (MemoryCurrentNumber !== 0 && MemoryPandingOperation === '')){
        MemoryCurrentNumber = display.value * display.value;
        display.value = MemoryCurrentNumber;
        MemoryPandingOperation = '';
    } else {
        display.value *= display.value;
        MemoryNewNumber = true;
    }
}

function clear(id) {
    if (id === 'ce'){
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPandingOperation = '';
    } else if (id === 'del' && display.value.length !== 1 && MemoryPandingOperation !== '=') {
        display.value = display.value.slice(0, display.value.length - 1);
        console.log(display.value)
    } else if (id === 'del' && display.value.length === 1 && MemoryPandingOperation !== '=') {
        display.value = '0';
    }
}
