import { add } from '../../src/utils/calculator';
import { subtract } from '../../src/utils/calculator';
import { multiply } from '../../src/utils/calculator';

describe("Addition", () => {
    test("addition de 2 et 3 retourne 5", () => {
        expect(add(2, 3)).toBe(5);
    });

    test("addition de nombres négatifs fonctionne", () => {
        expect(add(-2, -3)).toBe(-5);
    });
});

describe("Soustraction", () => {
    test("soustraction de 5 et 3 retourne 2", () => {
        expect(subtract(5, 3)).toBe(2);
    });

    test("soustraction de nombres négatifs fonctionne", () => {
        expect(subtract(-5, -3)).toBe(-2);
    });
});

describe("Multiplication", () => {
    test("multiplication de 2 et 3 retourne 6", () => {
        expect(multiply(2, 3)).toBe(6);
    });

    test("multiplication par 0 retourne 0", () => {
        expect(multiply(5, 0)).toBe(0);
    });
});
