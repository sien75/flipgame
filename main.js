import {
    root,
    number,
    refreshButton,
    reveal,
    success,
    create,
    insert,
} from './element.js';

import Checker from './checker.js';
import Blocks from './blocks.js';
import Solver from './solver.js';

const checker = new Checker();
const blocks = new Blocks(checker);

const checkerForSolver = new Checker();
const solver = new Solver(checkerForSolver);

// refresh

const rePaint = () => {
    root.innerHTML = '';
    const lines = blocks
        .getBlockElements()
        .map((lineBlocks) => insert(lineBlocks, create('line')));
    insert(lines, root);
};

const refresh = () => {
    const length = parseInt(number.value) || 1;
    blocks.refresh(length, length);
    rePaint();
};

number.onchange = refresh;
refreshButton.onclick = refresh;
refresh(); // init

// check success

checker.subscribe(({ success: successStatus }) => {
    success.innerHTML = successStatus ? 'success!' : '';
});

// solve

reveal.onclick = () => {
    const length = parseInt(number.value) || 1;
    reveal.innerHTML = 'solving...';
    setTimeout(() => {
        const resolution = solver.solve(length, length);
        blocks.paintResolution(resolution);
        reveal.innerHTML = 'reveal';
    }, 0);
};
