let change = require('./calc');
let changeMethod = change.stringToArr; // calc['calcSum']

let string = 'Hello world! This is test string.';

let result = changeMethod(string);

console.log(result);



