import { root } from '../element.js';

import { create, insert } from '../action.js';

const rePaint = (blockElements) => {
    root.innerHTML = '';
    const lines = blockElements.map((lineBlocks) =>
        insert(lineBlocks, create('line'))
    );
    insert(lines, root);
};

const refresh = (number, blocks) => {
    const { rows = 3, columns = 3 } = number.value();
    blocks.refresh(rows, columns);
    rePaint(blocks.getBlockElements());
};

export default refresh;
