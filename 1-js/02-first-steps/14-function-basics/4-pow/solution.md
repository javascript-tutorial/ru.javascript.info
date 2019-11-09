function isInteger(x) {
    return parseInt(x, 10) == x;
}

function isPositive(x) {
    return parseInt(x, 10) > 0;
}

function pow(x, n) {
    return isInteger(n) && isPositive(n) && (x ** n);
}

let x = prompt("Введите X: ", "");
let n = prompt("Введите N: ", "");
let xn = pow(x, n);
if (xn == false) {
    alert("Минимум одно из введенных вами значений не было числом, либо было дробным или отрицательным числом!");
} else {
    alert("X в степени N = " + xn);
}
