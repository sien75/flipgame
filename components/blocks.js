import { create, insert } from '../action.js';

class Blocks {
    refreshCallback = [];

    constructor(checker) {
        this.checker = checker;
        this.checker.subscribe(this._updateBlockElements);
        this.blocks = [];
    }

    getBlockElements() {
        return this.blocks;
    }

    refresh(rows, columns) {
        this.checker.refresh(rows, columns);
        this.blocks = this._refreshBlockElements(this.checker.getRules());
        this.refreshCallback.forEach((c) => c());
    }

    _refreshBlockElements(rules) {
        const styleObject = this._getStyleObjectWhenScreenWidthOverflow(rules);
        const attributes = (row, column, item) => ({
            ...{
                onclick: (e) => this._handleClick(e),
                class: item ? 'block-flipped' : '',
                row,
                column,
            },
            ...styleObject,
        });
        return rules.map((item, row) =>
            item.map((item, column) =>
                create('block', attributes(row, column, item))
            )
        );
    }

    _getStyleObjectWhenScreenWidthOverflow(rules) {
        let result = {};
        if (window.innerWidth < rules[0]?.length * 50) {
            const size = (window.innerWidth - 50) / rules[0].length;
            result = {
                style: `width: ${size}px; height: ${size}px`,
            };
        }
        return result;
    }

    _handleClick(e) {
        const { row, column } = e.target;
        if (!(typeof row === 'number') || !(typeof column === 'number')) return;
        this.checker.publish(row, column);
    }

    _updateBlockElements = ({ shouldToggle = [] }) => {
        shouldToggle.forEach(({ row, column }) => {
            this.blocks[row][column].classList.toggle('block-flipped');
        });
    };

    paintSolution(solution) {
        this._clearSolutionCircle();
        solution.forEach(({ row, column }) => {
            insert(create('solution-circle'), this.blocks[row][column]);
        });
    }

    _clearSolutionCircle() {
        this.blocks
            .reduce((prev, cur) => [...prev, ...cur], [])
            .filter((block) => block.children.length)
            .forEach((block) => {
                Array.from(block.children).forEach((child) => {
                    block.removeChild(child);
                });
            });
    }

    setCheckerCallback(callback) {
        this.checker.subscribe(callback);
    }

    setRefreshCallback(callback) {
        this.refreshCallback.push(callback);
    }
}

export default Blocks;
