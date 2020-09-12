'use strict';

/**
 * You must return a date that comes in a predetermined number of seconds after 01.06.2020 00:00:002020
 * @param {number} seconds
 * @returns {Date}
 *
 * @example
 *      31536000 -> 01.06.2021
 *      0 -> 01.06.2020
 *      86400 -> 02.06.2020
 */

function secondsToDate(seconds) {
    let stringBaseDate = "2020.06.01 00:00:00";
    let date = new Date(stringBaseDate);
    date.setSeconds(seconds);
    return date.toLocaleDateString("ru");
}

console.log("secondsToDate");
console.log(secondsToDate(31536000));
console.log(secondsToDate(0));
console.log(secondsToDate(86400));



/**
 * You must create a function that returns a base 2 (binary) representation of a base 10 (decimal) string number
 * ! Numbers will always be below 1024 (not including 1024)
 * ! You are not able to use parseInt
 * @param {number} decimal
 * @return {string}
 *
 * @example
 *      5 -> "101"
 *      10 -> "1010"
 */
function toBase2Converter(decimal) {
    return (decimal >>> 0).toString(2);
}
console.log("toBase2Converter");
console.log(toBase2Converter(5));
console.log(toBase2Converter(10));

/**
 * You must create a function that takes two strings as arguments and returns the number of times the first string
 * is found in the text.
 * @param {string} substring
 * @param {string} text
 * @return {number}
 *
 * @example
 *      'a', 'test it' -> 0
 *      't', 'test it' -> 2
 *      'T', 'test it' -> 2
 */
function substringOccurrencesCounter(substring, text) {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        let index = text.toLocaleLowerCase().indexOf(substring.toLocaleLowerCase(), i);
        if (index > 0) {
            count++;
            i = i + index;
        } else if (index == 0) {
            count++;
        }
    }
    return count;
}
console.log("substringOccurrencesCounter");
console.log(substringOccurrencesCounter("a", "test it"));
console.log(substringOccurrencesCounter("t", "test it"));
console.log(substringOccurrencesCounter("T", "test it"));
console.log(substringOccurrencesCounter("sT", "test it"));
console.log(substringOccurrencesCounter("sT  ", "test it"));

/**
 * You must create a function that takes a string and returns a string in which each character is repeated once.
 *
 * @param {string} string
 * @return {string}
 *
 * @example
 *      "Hello" -> "HHeelloo"
 *      "Hello world" -> "HHeello  wworrldd" // o, l is repeated more then once. Space was also repeated
 */
function repeatingLitters(string) {
    let repeatingCharacters = "";
    for (let i = 0; i < string.length; i++) {
        let char = string[i];
        repeatingCharacters += char;
        if (string.indexOf(char) == string.lastIndexOf(char)) {
            repeatingCharacters += char;
        }
    }
    return repeatingCharacters;
}
console.log("repeatingLitters");
console.log(repeatingLitters("Hello"));
console.log(repeatingLitters("Hello world"));

/**
 * You must write a function redundant that takes in a string str and returns a function that returns str.
 * ! Your function should return a function, not a string.
 *
 * @param {string} str
 * @return {function}
 *
 * @example
 *      const f1 = redundant("apple")
 *      f1() ➞ "apple"
 *
 *      const f2 = redundant("pear")
 *      f2() ➞ "pear"
 *
 *      const f3 = redundant("")
 *      f3() ➞ ""
 */
function redundant(str) {
    return function () {
        return str;
    }
}
console.log("redundant");
const f1 = redundant("apple")
console.log(f1());
const f2 = redundant("pear");
console.log(f2());
const f3 = redundant("");
console.log(f3());

/**
 * https://en.wikipedia.org/wiki/Tower_of_Hanoi
 *
 * @param {number} disks
 * @return {number}
 */
function towerHanoi(disks) {
    let countSteps = 0;
    stepsToSolveHanoiT(disks, "A", "B", "C");
    function stepsToSolveHanoiT(disks, srcP, desP, bufferP) {
        if (disks >= 1) {
            stepsToSolveHanoiT(disks - 1, srcP, bufferP, desP);
            countSteps++;
            stepsToSolveHanoiT(disks - 1, bufferP, desP, srcP);
        }
        return;
    }
    return countSteps;
}
console.log("towerHanoi");
console.log("disks = 1 -> " + towerHanoi(1));
console.log("disks = 3 -> " + towerHanoi(3));
console.log("disks = 5 -> " + towerHanoi(5));

/**
 * You must create a function that multiplies two matricies (n x n each).
 *
 * @param {array} matrix1
 * @param {array} matrix2
 * @return {array}
 *
 */
function matrixMultiplication(matrix1, matrix2) {
    let matrix1Size = matrix1.length;
    let matrix2Size = matrix2.length;
    let m = new Array(matrix1Size);
    for (let r = 0; r < matrix1Size; r++) {
        m[r] = new Array(matrix2Size);
        for (let c = 0; c < matrix2Size; c++) {
            m[r][c] = 0;
            for (let i = 0; i < matrix1Size; i++) {
                m[r][c] += matrix1[r][i] * matrix2[i][c];
            }
        }
    }
    return m;
}
console.log("matrixMultiplication");
console.table(matrixMultiplication([[5, 7], [1, 0]], [[9, 2], [7, 1]]));

/**
 * Create a gather function that accepts a string argument and returns another function.
 * The function calls should support continued chaining until order is called.
 * order should accept a number as an argument and return another function.
 * The function calls should support continued chaining until get is called.
 * get should return all of the arguments provided to the gather functions as a string in the order specified in the order functions.
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *      gather("a")("b")("c").order(0)(1)(2).get() ➞ "abc"
 *      gather("a")("b")("c").order(2)(1)(0).get() ➞ "cba"
 *      gather("e")("l")("o")("l")("!")("h").order(5)(0)(1)(3)(2)(4).get()  ➞ "hello"
 */
function gather(str) {
    let text = new Array(str);
    let indexes = [];
    let charPusing = function (char) {
        text.push(char);
        return charPusing;
    }
    charPusing.order = function (index) {
        indexes.push(index);
        return charPusing.order;
    }
    charPusing.order.get = function () {
        let rezultString = [];
        indexes.forEach(i => rezultString.push(text[i]));
        return rezultString.join("");
    }
    return charPusing;
}
console.log("gather");
console.log(gather("a")("b")("c").order(0)(1)(2).get());
console.log(gather("a")("b")("c").order(2)(1)(0).get());
console.log(gather("e")("l")("o")("l")("!")("h").order(5)(0)(1)(3)(2)(4).get());