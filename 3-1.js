// https://adventofcode.com/2020/day/3/input

var fs = require('fs');
var total = 0;
var currentPosition = 0;
var right = 3;
var down = 0;
var originalLine;
var characterAtCurrentPosition;
var transformedLine;
// fs.readFile('3-data.txt', "utf-8", function (err, data) {
//     if (err) throw err;
//     var array = data.toString().split("\n");

//     while (down < array.length) {
//         if (down != 0) {
//             if (currentPosition + right > array[0].length - 1) {
//                 console.log(`transformedLine ${down}: skipped`);
//                 down++;

//                 currentPosition = ((currentPosition + right) - currentPosition);
//                 originalLine = array[down + 1].replace(/(\r\n|\n|\r)/gm, "");
//                 characterAtCurrentPosition = originalLine.charAt(currentPosition);
//                 transformedLine = originalLine.replaceAt(currentPosition, newCharacterAtCurrentPosition(characterAtCurrentPosition));
//             } else {
//                 currentPosition = currentPosition + right;
//                 originalLine = array[down].replace(/(\r\n|\n|\r)/gm, "");
//                 characterAtCurrentPosition = originalLine.charAt(currentPosition);
//                 transformedLine = originalLine.replaceAt(currentPosition, newCharacterAtCurrentPosition(characterAtCurrentPosition));
//             }
//         } else {
//             originalLine = array[down].replace(/(\r\n|\n|\r)/gm, "");
//             transformedLine = originalLine;
//         }
//         console.log(`transformedLine ${down}: ${transformedLine}`);
//         down++;
//         var derpppp = "0123456789012345678901234567890123456789";
//         // console.log(`=======================================`);
//     }

//     console.log(`total: ${total}`);
// });

function newCharacterAtCurrentPosition(character) {
    if (character == ".") {
        return "O";
    } else {
        total++;
        // count++;
        return "X";
    }
}

String.prototype.replaceAt = function (index, replacement) {
    // index > 31 ? index = 31 : index = index;
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
/////////////////////////////////////////////////////////////////////////
// Get array of lines from data, and check against regex 
// pattern "contains combo of . and #"

fs.readFile('3-data.txt', "utf-8", function (err, data) {
    var array = data.toString().split("\n");
    // let array = data
    //     .toString()
    //     .split('\n')
    // // .filter(row => row
    // // .match(/[\#\.]/g))
    // console.log(array);

    var count = 0
    var y = 0
    var x = 0
    var line;
    const lastRowIndex = array[0].length - 1

    console.log(`start---: ${array[0]}`);
    // Console will return number of trees
    while (y < array.length - 1) {
        // As we approach end of string, make sure we return to 
        // beginning of next string at correct index
        if ((lastRowIndex - x) < 3) {
            x = x - lastRowIndex - 1
        }
        x = x + 3
        y = y + 1
        // console.log(`original: ${array[y]}`);
        if (array[y][x] === "#") {
            // array[y][x].replaceAt();
            count = count + 1
            // console.log(`here----: ${array[y]}`)
        }

        characterAtCurrentPosition = array[y].charAt(x);
        transformedLine = array[y].replaceAt(x, newCharacterAtCurrentPosition(characterAtCurrentPosition));

        console.log(`final--${y}: ${transformedLine}`);
        // console.log(`===================================`);
    }

    // console.log(count);
    console.log(total);
})

///////////////////////////////////////////////////////////////////////
// // Get array of lines from data, and check against regex 
// // pattern "contains combo of . and #"
// fs.readFile('3-data.txt', "utf-8", function (err, data) {
//     const rows = data.split('\n').filter(row => row.match(/[\#\.]/g))
//     // var array = data.toString().split("\n");

//     var count = 0
//     var y = 0
//     var x = 0
//     const lastRowIndex = rows[0].length - 1

//     // Console will return number of trees
//     while (y < rows.length - 1) {
//         // As we approach end of string, make sure we return to 
//         // beginning of next string at correct index
//         if ((lastRowIndex - x) < 3) {
//             x = x - lastRowIndex - 1
//         }
//         x = x + 3
//         y = y + 1
//         if (rows[y][x] === "#") {
//             count = count + 1
//         }
//     }
//     console.log(`slope 1: ${count}`);
// })