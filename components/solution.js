import { solutions as solutionsElement } from '../element.js';

class Solution {
    blocks;

    currentIndex = 0;
    total = 0;
    result = [];

    constructor(blocks) {
        this.blocks = blocks;
        this._resetWhenBlockRefresh();
        this._setButtonClickHandler();
    }

    _resetWhenBlockRefresh() {
        this.blocks.setRefreshCallback(() => {
            solutionsElement.solutionsResult.innerHTML =
                'click "reveal" to solve';
            solutionsElement.solutionsNumber.innerHTML = '';
            solutionsElement.solutionsPreviousButton.disabled = true;
            solutionsElement.solutionsNextButton.disabled = true;
        });
    }

    _setButtonClickHandler() {
        const update = () => {
            this._paintResult();
            this._setButtonStatus();
            this._setCurrentNumber();
        };
        solutionsElement.solutionsPreviousButton.onclick = () => {
            this.currentIndex = Math.max(this.currentIndex - 1, 0);
            update();
        };
        solutionsElement.solutionsNextButton.onclick = () => {
            this.currentIndex = Math.min(
                this.currentIndex + 1,
                Math.max(this.total - 1, 0)
            );
            update();
        };
    }

    _paintResult() {
        this.blocks.paintSolution(this.result[this.currentIndex] || []);
    }

    _setButtonStatus() {
        solutionsElement.solutionsPreviousButton.disabled =
            this.currentIndex <= 0;
        solutionsElement.solutionsNextButton.disabled =
            this.currentIndex >= this.total - 1;
    }

    _setCurrentNumber() {
        const currentIndexPlus1 = Math.min(this.currentIndex + 1, this.total);
        solutionsElement.solutionsNumber.innerHTML = `${currentIndexPlus1}/${this.total}`;
    }

    handle(result) {
        this.result = result || [];
        this.currentIndex = 0;
        this.total = result.length;
        this._setSolutionText();
        this._paintResult();
        this._setButtonStatus();
        this._setCurrentNumber();
    }

    _setSolutionText() {
        const unit = this.total > 1 ? 's' : '';
        solutionsElement.solutionsResult.innerHTML = `${this.total} solution${unit} found`;
    }
}

export default Solution;
