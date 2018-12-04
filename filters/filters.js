exports.strFilter = function strFilter(attribName, value) {
    if (attribName && value) {
        return {
            attrib: attribName,
            opr: ' LIKE ',
            val: `%${value}%`,
        };
    }
    return {};
};

exports.number = function number(attribName, value, operator) {
    if (attribName && typeof (value) === 'number' && operator) {
        return {
            attrib: attribName,
            opr: operator,
            val: value,
        };
    }
    return {};
};

exports.minNumber = function minNumber(attribName, value) {
    return this.number(attribName, value, '>=');
};

exports.maxNumber = function maxNumber(attribName, value) {
    return this.number(attribName, value, '<=');
};
