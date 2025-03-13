import { add } from '../../src/utils/calculator';
import { subtract } from '../../src/utils/calculator';

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
