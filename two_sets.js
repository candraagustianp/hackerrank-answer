'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'getTotalX' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER_ARRAY b
 */

function getTotalX(a, b) {
    // Write your code here
    let minb = b.reduce((a,b) => a < b ? a : b);
    let consi = [];
    for (let i = a.reduce((a,b) => a>b ? a : b); i <= minb; i++) {      
        let stat = 0;
        for (let j = 0; j < a.length; j++) {
            if (i % a[j] != 0) {
                stat = i % a[j];
                break;
            }
        }
        
        if (stat != 0) continue;
        consi.push(i);
    }

    for (let i = 0; i < b.length; i++) {
        for (let j = 0; j < consi.length; j++) {
            if (b[i] % consi[j] != 0) {
                consi.splice(j,1);
                j--;
            }
        }
    }
    
    return consi.length ;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const brr = readLine().replace(/\s+$/g, '').split(' ').map(brrTemp => parseInt(brrTemp, 10));

    const total = getTotalX(arr, brr);

    ws.write(total + '\n');

    ws.end();
}
