class Number {
    rowsNumberElement;
    columnsNumberElement;
    rows;
    columns;
    onChangeHandlers = [];

    constructor(props) {
        this._initRowsAndColumns(props);
        this._initButtons(props);
    }

    _initRowsAndColumns({ rowsNumberElement, columnsNumberElement }) {
        this.rowsNumberElement = rowsNumberElement;
        this.columnsNumberElement = columnsNumberElement;
        this.rows = parseInt(this.rowsNumberElement.innerHTML) || 3;
        this.columns = parseInt(this.columnsNumberElement.innerHTML) || 3;
    }
    
    _initButtons(props) {
        ['rows', 'columns'].forEach((dimention) => {
            ['Minus', 'Plus'].forEach((operation) => {
                const button = props[`${dimention}${operation}Button`];
                button.addEventListener('click', () =>
                    this._updateButton({
                        dimention,
                        operation,
                        elementName: `${dimention}NumberElement`,
                    })
                );
            });
        });
    }

    _updateButton({ dimention, operation, elementName }) {
        let newValue = 3;
        if(operation === 'Minus') {
            newValue = Math.max(this[dimention] - 1, 1);
        } else {
            newValue = Math.min(this[dimention] + 1, 20);
        }
        this[elementName].innerHTML = newValue;
        this[dimention] = parseInt(this[elementName].innerHTML) || 3;
        this.onChangeHandlers.forEach(h => h());
    }

    value() {
        return { rows: this.rows, columns: this.columns };
    }
    
    onChange(onChangeHandler) {
        this.onChangeHandlers.push(onChangeHandler);
    }
}

export default Number;
