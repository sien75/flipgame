import Combinations from './combinations.js';

class Solver {
    rows;
    columns;
    checker;
    combinations;

    constructor(checker) {
        this.rows = 1;
        this.columns = 1;
        this.checker = checker;
        this.checker.subscribe(this._syncSuccess);
        this.combinations = new Combinations();
    }

    solve(rows, columns) {
        if (!rows || !columns) return [];
        this.rows = rows;
        this.columns = columns;

        const combinations = this.combinations.getCombinations(columns);
        return this._checkAll(combinations);
    }

    _checkAll(combinations) {
        return combinations
            .map((combination) => this._checkSingle(combination))
            .filter((solution) => solution);
    }

    _checkSingle(combination) {
        this.checker.refresh(this.rows, this.columns);
        const firstRowClicked = this._clickFirstRow(combination);
        const lastRowsClicked = this._clickLastRows();
        if (this._foundResolution)
            return [...firstRowClicked, ...lastRowsClicked];
        return null;
    }

    _clickFirstRow(combination) {
        const result = [];
        combination.forEach((column) => {
            this.checker.publish(0, column);
            result.push({ row: 0, column });
        });
        return result;
    }

    _clickLastRows() {
        const result = [];
        Array(this.rows - 1)
            .fill()
            .forEach((item, row) => {
                result.push(...this._clickOneOfLastRows(row));
            });
        return result;
    }

    _clickOneOfLastRows(row) {
        const result = [];
        this.checker.getRules()[row].forEach((rule, column) => {
            if (!rule) {
                this.checker.publish(row + 1, column);
                result.push({ row: row + 1, column });
            }
        });
        return result;
    }

    _foundResolution = false;

    _syncSuccess = ({ success }) => {
        if (this._foundResolution != success) {
            this._foundResolution = success;
        }
    };
}

export default Solver;
