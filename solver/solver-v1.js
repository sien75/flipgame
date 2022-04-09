class Solver {
    constructor(checker) {
        this.row = 1;
        this.column = 1;
        this.checker = checker;
        this.checker.subscribe(this._syncSuccess);
    }

    solve(row, column) {
        this.row = row;
        this.column = column;
        if (row !== column) return [];

        const conditions = this._getConditions(row);
        const combinations = this._getCombinations(conditions.length);
        const singleSolution = this._check(conditions, combinations, row);
        return [singleSolution];
    }

    _getConditions(length) {
        if (length === 1 || length === 2)
            return this._getSideConditions(length);
        return [
            ...this._getSideConditions(length),
            ...this._getConditions(length - 2).map(this._addBase),
        ];
    }

    _getSideConditions(length) {
        // const halfLength = parseInt((length + 1) / 2);
        return Array(length - 1 || 1)
            .fill()
            .map((item, index) => this._listAll(index, length))
            .map(this._deduplicate);
    }

    _listAll(index, length) {
        return [
            { row: 0, column: index },
            // { row: 0, column: length - 1 - index },
            // { row: length - 1 - 0, column: index },
            { row: length - 1 - 0, column: length - 1 - index },

            // { row: index, column: 0 },
            { row: length - 1 - index, column: 0 },
            { row: index, column: length - 1 - 0 },
            // { row: length - 1 - index, column: length - 1 - 0 },
        ];
    }

    _deduplicate(condition) {
        const result = [];
        const resultHas = (item) =>
            result.some(
                (_item) =>
                    _item.row === item.row && _item.column === item.column
            );
        condition.forEach((item) => {
            if (!resultHas(item)) result.push(item);
        });
        return result;
    }

    _addBase(condition) {
        return condition.map(({ row, column }) => ({
            row: row + 1,
            column: column + 1,
        }));
    }

    _getCombinations(length, combinationNumber = 1) {
        if (!length >= 1) return [];
        if (length === combinationNumber) {
            return this._getCombinationsInLengthAndNumber(
                length,
                combinationNumber
            );
        }
        return [
            ...this._getCombinationsInLengthAndNumber(
                length,
                combinationNumber
            ),
            ...this._getCombinations(length, combinationNumber + 1),
        ];
    }

    _getCombinationsInLengthAndNumber(length, combinationNumber) {
        const result = [];
        let beacons = this._initBeacons(combinationNumber);
        result.push(beacons);
        while (
            !(beacons[beacons.length - 1].current === length - beacons.length)
        ) {
            beacons = this._nexeBeacons(beacons, length);
            result.push(beacons);
        }
        return result.map(this._removeMiddle);
    }

    _initBeacons(number) {
        return Array(number)
            .fill()
            .map((item, index) => ({
                current: index,
            }))
            .reverse();
    }

    _nexeBeacons(beacons, length) {
        const shouldMoveBeacon = this._shouldMoveBeacon(beacons, length);
        const baseIndex = beacons.indexOf(shouldMoveBeacon);
        return beacons.map((beacon, index) => {
            if (index <= baseIndex) {
                return {
                    current: shouldMoveBeacon.current + baseIndex - index + 1,
                };
            }
            return beacon;
        });
    }

    _shouldMoveBeacon(beacons, length) {
        return beacons.find((beacon) => {
            const beaconNextCurrent = beacon.current + 1;
            return (
                beaconNextCurrent < length &&
                !this._hasCurrent(beacons, beaconNextCurrent)
            );
        });
    }

    _hasCurrent(beacons, current) {
        return beacons.some((beacon) => beacon.current === current);
    }

    _removeMiddle(beacons) {
        return beacons.map(({ current }) => current).reverse();
    }

    _foundResolution = false;

    _check(conditions, combinations, length) {
        let currentIndex = 0,
            combination;
        while ((combination = combinations[currentIndex])) {
            this._checkSingle(conditions, combination, length);
            if (this._foundResolution)
                return this._translateToResolution(conditions, combination);
            currentIndex++;
        }
        return [];
    }

    _checkSingle(conditions, combination, length) {
        this.checker.refresh(length, length);
        combination.forEach((conditionIndex) => {
            conditions[conditionIndex].forEach(({ row, column }) => {
                this.checker.publish(row, column);
            });
        });
    }

    _translateToResolution(conditions, combination) {
        return combination.reduce((prev, cur) => {
            return [...prev, ...conditions[cur]];
        }, []);
    }

    _syncSuccess = ({ success }) => {
        if (this._foundResolution != success) {
            this._foundResolution = success;
        }
    };
}

export default Solver;
