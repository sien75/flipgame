export const root = document.querySelector('#root');
export const number = document.querySelector('#number');
export const refreshButton = document.querySelector('#refresh');
export const reveal = document.querySelector('#reveal');
export const success = document.querySelector('#success');

export const create = (className, attributes = {}) => {
    const result = document.createElement('div');
    result.classList.add(className);
    Object.keys(attributes).forEach((key) => (result[key] = attributes[key]));
    return result;
};

export const insert = (ele, parentEle) => {
    if (ele instanceof Array) {
        ele.forEach((singleEle) => parentEle.appendChild(singleEle));
    } else {
        parentEle.appendChild(ele);
    }
    return parentEle;
};

