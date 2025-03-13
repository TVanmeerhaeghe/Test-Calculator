import { add } from '../../src/utils/calculator';
import { subtract } from '../../src/utils/calculator';
import { multiply } from '../../src/utils/calculator';
import { Calculator } from '../../src/utils/calculator';

describe("Addition", () => {
    test("addition de 2 et 3 retourne 5", () => {
        expect(add(2, 3)).toBe(5);
    });

    test("addition de nombres négatifs fonctionne", () => {
        expect(add(-22, -5)).toBe(-27);
    });
});

describe("Soustraction", () => {
    test("soustraction de 5 et 3 retourne 2", () => {
        expect(subtract(5, 3)).toBe(2);
    });

    test("soustraction de nombres négatifs fonctionne", () => {
        expect(subtract(-58, -20)).toBe(-38);
    });
});

describe("Multiplication", () => {
    test("multiplication de 2 et 3 retourne 6", () => {
        expect(multiply(2, 3)).toBe(6);
    });

    test("multiplication par 0 retourne 0", () => {
        expect(multiply(88, 0)).toBe(0);
    });
});

describe("Historique", () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });

    test("ajoute une addition à l'historique", () => {
        calc.add(2, 3);
        expect(calc.history).toEqual(["2 + 3 = 5"]);
    });

    test("ajoute une soustraction à l'historique", () => {
        calc.subtract(10, 4);
        expect(calc.history).toEqual(["10 - 4 = 6"]);
    });

    test("ajoute une multiplication à l'historique", () => {
        calc.multiply(3, 5);
        expect(calc.history).toEqual(["3 * 5 = 15"]);
    });
});
