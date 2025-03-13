import { Calculator } from '../../src/utils/calculator';

describe("Addition", () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });

    test("addition de 2 et 3 retourne 5", () => {
        expect(calc.add(2, 3)).toBe(5);
    });

    test("addition de nombres négatifs fonctionne", () => {
        expect(calc.add(-22, -5)).toBe(-27);
    });
});

describe("Soustraction", () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });

    test("soustraction de 5 et 3 retourne 2", () => {
        expect(calc.subtract(5, 3)).toBe(2);
    });

    test("soustraction de nombres négatifs fonctionne", () => {
        expect(calc.subtract(-58, -20)).toBe(-38);
    });
});

describe("Multiplication", () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });

    test("multiplication de 2 et 3 retourne 6", () => {
        expect(calc.multiply(2, 3)).toBe(6);
    });

    test("multiplication par 0 retourne 0", () => {
        expect(calc.multiply(88, 0)).toBe(0);
    });
});

describe("Division", () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });

    test("division de 10 par 2 retourne 5", () => {
        expect(calc.divide(10, 2)).toBe(5);
    });

    test("division avec un résultat décimal fonctionne", () => {
        expect(calc.divide(7, 2)).toBeCloseTo(3.5);
    });

    test("division par zéro retourne null", () => {
        expect(calc.divide(42, 0)).toBeNull();
    });
});