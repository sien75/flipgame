import { create, insert } from './element.js';

class Blocks {
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
    }

    _refreshBlockElements(rules) {
        return rules.map((item, row) =>
            item.map((item, column) =>
                create('block', {
                    onclick: (e) => this._handleClick(e),
                    class: item ? 'block-flipped' : '',
                    row,
                    column,
                })
            )
        );
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
    }

    paintResolution(resolution) {
        resolution.forEach(({row, column}) => {
            if(!this.blocks[row][column].childNodes.length) {
                insert(create('resolution-circle'), this.blocks[row][column]);
            }
        });
    }
}

export default Blocks;
