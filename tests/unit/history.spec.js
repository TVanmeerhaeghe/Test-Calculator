import { History } from '../../src/utils/history';

describe("Historique", () => {
    let history;

    beforeEach(() => {
        history = new History();
    });

    test("ajoute une addition à l'historique", () => {
        history.addEntry(2, 3, "+", 5);
        expect(history.getAll()).toEqual(["2 + 3 = 5"]);
    });

    test("ajoute une soustraction à l'historique", () => {
        history.addEntry(5, 3, "-", 2);
        expect(history.getAll()).toEqual(["5 - 3 = 2"]);
    });

    test("ajoute une multiplication à l'historique", () => {
        history.addEntry(2, 3, "*", 6);
        expect(history.getAll()).toEqual(["2 * 3 = 6"]);
    });

    test("ajoute une division à l'historique", () => {
        history.addEntry(10, 2, "/", 5);
        expect(history.getAll()).toEqual(["10 / 2 = 5"]);
    });

    test("ajoute plusieurs opérations à l'historique", () => {
        history.addEntry(2, 3, "+", 5);
        history.addEntry(5, 3, "-", 2);
        history.addEntry(3, 5, "*", 15);
        expect(history.getAll()).toEqual([
            "2 + 3 = 5",
            "5 - 3 = 2",
            "3 * 5 = 15"
        ]);
    });

    test("efface l'historique", () => {
        history.addEntry(5, 2, "+", 7);
        history.clear();
        expect(history.getAll()).toEqual([]);
    });
});
