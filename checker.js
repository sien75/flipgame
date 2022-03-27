class Checker {
    constructor() {
        this.rows = 1;
        this.columns = 1;
        this.rules = [];
        this.callbacks = [];
    }

    getRules() {
        return this.rules;
    }

    refresh(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.rules = this._refreshRules();
        this.publish();
    }

    _refreshRules() {
        return Array(this.rows)
            .fill(false)
            .map(() => Array(this.columns).fill(false));
    }

    publish(row, column) {
        const shouldToggle =
            row >= 0 && column >= 0 ? this._getShouldToggle(row, column) : [];
        this._updateRules(shouldToggle);
        this.callbacks.forEach((f) =>
            f({ shouldToggle, success: this._checkSuccess() })
        );
    }

    subscribe(callback) {
        this.callbacks.push(callback);
    }

    _getShouldToggle(row, column) {
        return [
            { row, column },
            { row: row, column: column - 1 },
            { row: row, column: column + 1 },
            { row: row - 1, column },
            { row: row + 1, column },
        ].filter(
            ({ row, column }) =>
                0 <= row &&
                row < this.rules.length &&
                0 <= column &&
                column < this.rules[row].length
        );
    }

    _updateRules(shouldToggle) {
        shouldToggle.forEach(
            ({ row, column }) =>
                (this.rules[row][column] = !this.rules[row][column])
        );
    }

    _checkSuccess() {
        return this.rules.every((line) => line.every((rule) => rule));
    }
}

export default Checker;
