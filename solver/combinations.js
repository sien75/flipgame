class Combinations {
    getCombinations(length, combinationNumber = 0) {
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
            ...this.getCombinations(length, combinationNumber + 1),
        ];
    }

    _getCombinationsInLengthAndNumber(length, combinationNumber) {
        const result = [];
        let beacons = this._initBeacons(combinationNumber);
        result.push(beacons);
        while (
            beacons.length &&
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
}

export default Combinations;
