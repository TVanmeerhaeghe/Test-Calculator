export class History {
    constructor() {
        this.history = [];
    }

    addEntry(a, b, operator, result) {
        this.history.push(`${a} ${operator} ${b} = ${result}`);
    }

    clear() {
        this.history = [];
    }

    getAll() {
        return [...this.history];
    }
}