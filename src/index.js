function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let output;

    var re = /(\()([0-9+\-*./ ]*)(\))/;
    re.lastIndex = 0;
    while (re.test(expr)) {
        output = expressionCalculator(RegExp.$2)
        expr = expr.replace(re, output);
    }

    if (expr.indexOf('(') != -1 || expr.indexOf(')') != -1) {
        throw Error('ExpressionError: Brackets must be paired.');
    }

    let operation = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '/': (a, b) => {
            if (b == 0) {
                throw TypeError('TypeError: Division by zero.');
            }
            return a / b;
        },
        '*': (a, b) => a * b,
    };

    priority = [
        ['*', '/'],
        ['+', '-']
    ];

    expr = expr.replace(/[^0-9*\/\-+.]/g, '');

    for (let i = 0; i < priority.length; i++) {
        let re = new RegExp('([\-+]?\\d+\\.?\\d*)([\\' + priority[i].join('\\') + '])([\-+]?\\d+\\.?\\d*)');
        re.lastIndex = 0;

        while (re.test(expr)) {
            output = operation[RegExp.$2](+RegExp.$1, +RegExp.$3)
            expr = expr.replace(re, ((output >= 0)? '+' :'') + output);
        }
    }

    return output;
}

module.exports = {
    expressionCalculator
}