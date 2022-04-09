import {
    number as numberElements,
    revealButton,
    refreshButton,
    success,
} from '../element.js';

import Checker from '../checker.js';

import Blocks from '../components/blocks.js';
import Number from '../components/number.js';

import refresh from './refresh.js';
import solve from './solve.js';

const checker = new Checker();
const blocks = new Blocks(checker);

const number = new Number(numberElements);

// refresh

blocks.setCheckerCallback(({ success: _success }) => {
    const innerHTML = _success ? 'success!' : '';
    success.innerHTML = innerHTML;
});

number.onChange(() => refresh(number, blocks));
refreshButton.onclick = () => refresh(number, blocks);
refresh(number, blocks); // init

// solve

const showSolvingStatus = (solving) => {
    const innerHTML = solving ? 'solving...' : 'reveal';
    revealButton.innerHTML = innerHTML;
};

revealButton.onclick = () => solve(number, blocks, showSolvingStatus);
