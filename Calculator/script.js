const screen = document.getElementById('screen');
        const buttons = document.querySelectorAll('.buttons button');
        const toggleModeButton = document.getElementById('toggleMode');

        let currentInput = '';
        let operator = null;
        let firstOperand = null;

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.textContent;
                handleInput(value);
            });
        });

        function handleInput(value) {
            if (value === 'C') {
                currentInput = '';
                firstOperand = null;
                operator = null;
                screen.value = '';
            } else if (value === '=') {
                if (operator && firstOperand !== null && currentInput) {
                    const secondOperand = parseFloat(currentInput);
                    const result = calculate(firstOperand, secondOperand, operator);
                    screen.value = result;
                    currentInput = '' + result;
                    firstOperand = result;
                    operator = null;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    firstOperand = parseFloat(currentInput);
                    operator = value;
                    currentInput = '';
                }
            } else {
                currentInput += value;
                screen.value = currentInput;
            }
        }

        function calculate(a, b, op) {
            switch (op) {
                case '+': return a + b;
                case '-': return a - b;
                case '*': return a * b;
                case '/': return b !== 0 ? a / b : 'Error';
                default: return 0;
            }
        }

        toggleModeButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event from bubbling to buttons
            document.body.classList.toggle('dark-mode');
        });

        document.addEventListener('keydown', (event) => {
            const key = event.key;
            if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.', 'Enter', 'Backspace'].includes(key)) {
                event.preventDefault();
                if (key === 'Enter') {
                    handleInput('=');
                } else if (key === 'Backspace') {
                    currentInput = currentInput.slice(0, -1);
                    screen.value = currentInput;
                } else {
                    handleInput(key);
                }
            }
    });