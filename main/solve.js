import Checker from '../checker.js';
import Solver from '../solver/index.js';

import Solution from '../components/solution.js';

const checkerForSolver = new Checker();
const solver = new Solver(checkerForSolver);

let solution;

const solve = (number, blocks, callback) => {
    if (!solution) {
        solution = new Solution(blocks);
    }
    const { rows = 3, columns = 3 } = number.value();
    callback(true);
    setTimeout(() => {
        const result = solver.solve(rows, columns);
        solution.handle(result);
        callback(false);
    }, 0);
};

export default solve;
