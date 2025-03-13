export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export class Calculator {
    constructor() {
        this.history = [];
    }

    add(a, b) {
        const result = a + b;
        this._addToHistory(a, b, "+", result);
        return result;
    }

    subtract(a, b) {
        const result = a - b;
        this._addToHistory(a, b, "-", result);
        return result;
    }

    multiply(a, b) {
        const result = a * b;
        this._addToHistory(a, b, "*", result);
        return result;
    }

    _addToHistory(a, b, operator, result) {
        this.history.push(`${a} ${operator} ${b} = ${result}`);
    }

}