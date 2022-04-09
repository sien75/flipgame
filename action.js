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
