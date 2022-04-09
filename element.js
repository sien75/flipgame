const rowsNumberElement = document.querySelector('#rows-number');
const rowsMinusButton = document.querySelector('#rows-minus');
const rowsPlusButton = document.querySelector('#rows-plus');

const columnsNumberElement = document.querySelector('#columns-number');
const columnsMinusButton = document.querySelector('#columns-minus');
const columnsPlusButton = document.querySelector('#columns-plus');

export const number = {
    rowsNumberElement,
    rowsMinusButton,
    rowsPlusButton,
    columnsNumberElement,
    columnsMinusButton,
    columnsPlusButton,
};

export const refreshButton = document.querySelector('#refresh');

export const revealButton = document.querySelector('#reveal');

export const root = document.querySelector('#root');

export const success = document.querySelector('#success');

const solutionsResult = document.querySelector('#solutions-result');
const solutionsNumber = document.querySelector('#solutions-number');
const solutionsPreviousButton = document.querySelector('#solutions-previous');
const solutionsNextButton = document.querySelector('#solutions-next');

export const solutions = {
    solutionsResult,
    solutionsNumber,
    solutionsPreviousButton,
    solutionsNextButton,
};
