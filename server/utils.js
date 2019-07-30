const _toSQLObj = function(obj) {
    const keys = Object.keys(obj);
    var statement = "JSON_OBJECT(";
    keys.forEach((key) => {
        statement += "\"" + key + "\"" + ", ";
        const val = obj[key];
        if (Array.isArray(val)) {
            statement += _toSQLArr(val);
        } else if (typeof val === 'object') {
            statement += _toSQLObj(val);
        } else if (typeof val === 'string') {
            statement += '\"' + val + '\"';
        } else {
            statement += val;
        }
        statement += ", ";
    });
    return statement.slice(0, statement.length-2) + ")";
}

const _toSQLArr = function(arr) {
    var statement = "JSON_ARRAY(";
    arr.forEach((val) => {
        if (Array.isArray(val)) {
            statement += _toSQLArr(val);
        } else if (typeof val === 'object') {
            statement += _toSQLObj(val);
        } else if (typeof val === 'string') {
            statement += '\"' + val + '\"';
        } else {
            statement += val;
        }
        statement += ", ";
    });
    return statement.slice(0, statement.length-2) + ")";
}

exports.toSQLObj = _toSQLObj;
exports.toSQLArr = _toSQLArr;