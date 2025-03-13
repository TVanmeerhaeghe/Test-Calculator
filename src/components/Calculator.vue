<template>
    <div class="calculator">
        <div class="display">
            <p>{{ currentInput || "0" }}</p>
        </div>

        <div class="buttons">
            <button @click="clear" class="clear">C</button>
            <button @click="deleteLast" class="delete">⌫</button>
            <button @click="appendOperator('/')" class="operator">÷</button>
            <button @click="appendOperator('*')" class="operator">×</button>

            <button @click="appendNumber(7)">7</button>
            <button @click="appendNumber(8)">8</button>
            <button @click="appendNumber(9)">9</button>
            <button @click="appendOperator('-')" class="operator">−</button>

            <button @click="appendNumber(4)">4</button>
            <button @click="appendNumber(5)">5</button>
            <button @click="appendNumber(6)">6</button>
            <button @click="appendOperator('+')" class="operator">+</button>

            <button @click="appendNumber(1)">1</button>
            <button @click="appendNumber(2)">2</button>
            <button @click="appendNumber(3)">3</button>
            <button @click="calculate" class="equal">=</button>

            <button @click="appendNumber(0)" class="zero">0</button>
            <button @click="appendDecimal">.</button>
        </div>

        <div class="history">
            <h3>Historique</h3>
            <ul>
                <li v-for="(entry, index) in reversedHistory" :key="index" @click="loadHistoryEntry(entry)">
                    {{ entry }}
                </li>
            </ul>
            <button @click="clearHistory" class="history-clear">Effacer historique</button>
        </div>
    </div>
</template>

<script>
import { Calculator } from '../utils/calculator';
import { History } from '../utils/history';

export default {
    data() {
        return {
            currentInput: "",
            calculator: new Calculator(),
            history: new History(),
            lastResultUsed: false,
        };
    },
    computed: {
        reversedHistory() {
            return [...this.history.getAll()].reverse();
        }
    },
    methods: {
        appendNumber(number) {
            if (this.lastResultUsed) {
                this.currentInput = "";
                this.lastResultUsed = false;
            }
            this.currentInput += number.toString();
        },
        appendOperator(operator) {
            if (this.currentInput !== "" && !this.currentInput.endsWith(" ")) {
                this.currentInput += ` ${operator} `;
                this.lastResultUsed = false;
            }
        },
        appendDecimal() {
            const parts = this.currentInput.split(" ");
            const lastPart = parts[parts.length - 1];
            if (!lastPart.includes(".")) {
                this.currentInput += ".";
            }
        },
        deleteLast() {
            this.currentInput = this.currentInput.trim().slice(0, -1);
        },
        clear() {
            this.currentInput = "";
            this.lastResultUsed = false;
        },
        calculate() {
            try {
                const parts = this.currentInput.split(" ");
                if (parts.length < 3) return;

                const a = parseFloat(parts[0]);
                const operator = parts[1];
                const b = parseFloat(parts[2]);
                let result = null;

                switch (operator) {
                    case "+":
                        result = this.calculator.add(a, b);
                        break;
                    case "-":
                        result = this.calculator.subtract(a, b);
                        break;
                    case "*":
                        result = this.calculator.multiply(a, b);
                        break;
                    case "/":
                        if (b === 0) {
                            result = "Erreur";
                        } else {
                            result = this.calculator.divide(a, b);
                        }
                }

                if (result !== null) {
                    this.history.addEntry(a, b, operator, result);
                    this.currentInput = result.toString();
                    this.lastResultUsed = true;
                }
            } catch {
                this.currentInput = "Erreur";
            }
        },
        clearHistory() {
            this.history.clear();
        },
        loadHistoryEntry(entry) {
            const expression = entry.split(" = ")[0];
            this.currentInput = expression;
            this.lastResultUsed = false;
        }
    }
};
</script>

<style scoped>
.calculator {
    max-width: 320px;
    margin: auto;
    padding: 20px;
    border-radius: 10px;
    background: #1e1e1e;
    color: white;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    text-align: center;
    font-family: Arial, sans-serif;
}

.display {
    background: #333;
    padding: 15px;
    text-align: right;
    font-size: 32px;
    border-radius: 5px;
    margin-bottom: 10px;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}

button {
    background: #444;
    border: none;
    padding: 15px;
    font-size: 20px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;
}

button:hover {
    background: #666;
}

button.operator {
    background: #ff9500;
}

button.operator:hover {
    background: #cc7a00;
}

button.equal {
    background: #28a745;
    grid-row: span 2;
}

button.equal:hover {
    background: #218838;
}

button.clear,
button.delete {
    background: #dc3545;
}

button.clear:hover,
button.delete:hover {
    background: #b02a37;
}

button.zero {
    grid-column: span 2;
}

.history {
    margin-top: 20px;
    text-align: left;
    background: #292929;
    padding: 10px;
    border-radius: 5px;
}

.history h3 {
    font-size: 16px;
    margin-bottom: 5px;
}

.history ul {
    list-style: none;
    padding: 0;
    max-height: 120px;
    overflow-y: auto;
}

.history li {
    background: white;
    color: black;
    padding: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s;
}

.history li:hover {
    background: #ddd;
}

.history-clear {
    background: #007bff;
    width: 100%;
    margin-top: 5px;
}

.history-clear:hover {
    background: #0056b3;
}
</style>