<template>
  <div class="calculator">
    <div class="display">
      <p>{{ currentInput || '0' }}</p>
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
        <li
          v-for="(entry, index) in reversedHistory"
          :key="index"
          @click="loadHistoryEntry(entry)"
        >
          {{ entry }}
        </li>
      </ul>
      <button @click="clearHistory" class="history-clear">
        Effacer historique
      </button>
    </div>
  </div>
</template>

<script>
import { Calculator } from '../utils/calculator';
import { History } from '../utils/history';

export default {
  data() {
    return {
      currentInput: '',
      calculator: new Calculator(),
      history: new History(),
      lastResultUsed: false,
    };
  },
  computed: {
    reversedHistory() {
      return [...this.history.getAll()].reverse();
    },
  },
  methods: {
    appendNumber(number) {
      if (this.lastResultUsed) {
        this.currentInput = '';
        this.lastResultUsed = false;
      }
      this.currentInput += number.toString();
    },
    appendOperator(operator) {
      if (this.currentInput !== '' && !this.currentInput.endsWith(' ')) {
        this.currentInput += ` ${operator} `;
        this.lastResultUsed = false;
      }
    },
    appendDecimal() {
      const parts = this.currentInput.split(' ');
      const lastPart = parts[parts.length - 1];
      if (!lastPart.includes('.')) {
        this.currentInput += '.';
      }
    },
    deleteLast() {
      this.currentInput = this.currentInput.trim().slice(0, -1);
    },
    clear() {
      this.currentInput = '';
      this.lastResultUsed = false;
    },
    calculate() {
      try {
        const parts = this.currentInput.split(' ');
        if (parts.length < 3) return;

        const a = parseFloat(parts[0]);
        const operator = parts[1];
        const b = parseFloat(parts[2]);
        let result = null;

        switch (operator) {
          case '+':
            result = this.calculator.add(a, b);
            break;
          case '-':
            result = this.calculator.subtract(a, b);
            break;
          case '*':
            result = this.calculator.multiply(a, b);
            break;
          case '/':
            if (b === 0) {
              result = 'Erreur';
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
        this.currentInput = 'Erreur';
      }
    },
    clearHistory() {
      this.history.clear();
    },
    loadHistoryEntry(entry) {
      const expression = entry.split(' = ')[0];
      this.currentInput = expression;
      this.lastResultUsed = false;
    },
  },
};
</script>

<style scoped>
.calculator {
  display: grid;
  grid-template-columns: 1fr 200px;
  grid-template-rows: auto 1fr;
  gap: 20px;
  max-width: 540px;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  background: #1e1e1e;
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
}

.display {
  grid-column: 1 / 2;
  grid-row: 1;
  background: #2b2b2b;
  padding: 20px;
  text-align: right;
  font-size: 36px;
  margin-bottom: 15px;
  border: 2px solid #3f3f3f;
  box-shadow: inset 0 0 3px rgba(255, 255, 255, 0.05);
}

.buttons {
  grid-column: 1 / 2;
  grid-row: 2;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

button {
  background: #3a3a3a;
  border: none;
  padding: 15px;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

button:hover {
  background: #4a4a4a;
  transform: scale(1.02);
}

button.operator {
  background: #494949;
}

button.operator:hover {
  background: #5a5a5a;
}

button.equal {
  background: #0078d4;
  grid-row: span 2;
}

button.equal:hover {
  background: #0064b5;
}

button.clear,
button.delete {
  background: #ed4c4c;
}

button.clear:hover,
button.delete:hover {
  background: #d43e3e;
}

button.zero {
  grid-column: span 2;
}

.history {
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  background: #2b2b2b;
  padding: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  align-self: start;
}

.history h3 {
  font-size: 16px;
  margin-bottom: 5px;
  color: #fff;
}

.history ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
}

.history li {
  background: #3a3a3a;
  color: #fff;
  padding: 6px;
  margin-bottom: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.history li:hover {
  background: #4a4a4a;
}

.history-clear {
  background: #575757;
  color: #fff;
  width: 100%;
  margin-top: 5px;
  padding: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.history-clear:hover {
  background: #6a6a6a;
  transform: scale(1.01);
}
</style>
