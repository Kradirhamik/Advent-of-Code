// 218
// somewhere here
// 253

var fs = require('fs');
var passports;
var finalPassports = [];
var passportLine = "";
var totalValidPassports = 0;
const passportDataTypes = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
    // "cid",
];

fs.readFile('4-data.txt', "utf-8", function (err, data) {
    // console.log(data);
    // console.log("===========");

    // passports = JSON.parse(data);

    passports = data
        .toString()
        .split(`\r\n`);

    for (let index = 0; index < passports.length; index++) {
        if (passports[index] != "") {
            passportLine += passports[index]
        } else {
            finalPassports.push(passportLine);
            passportLine = "";
        }
    }

    for (let index = 0; index < finalPassports.length; index++) {
        const finalPassport = finalPassports[index];
        var isCurrentPassportValid = true;
        var reason = "";

        var finalPassportString = finalPassport.toString();

        // check if all passport data types are present
        passportDataTypes.forEach(passportDataType => {
            const matcher = passportDataType + ":";

            // if (!finalPassportString.includes(matcher) && passportDataType != "cid") {
            if (!finalPassportString.includes(matcher)) {
                isCurrentPassportValid = false;
                reason = passportDataType;
            }

            // console.log(`finalPassportString index ${index} (${finalPassportString}) has passportDataType ${passportDataType}: ${finalPassportString.includes(matcher)}`)
        });

        if (isCurrentPassportValid) {
            totalValidPassports++;
        }
        reason ?
            console.log(`finalPassport ${index}: (${finalPassportString}) - valid: ${isCurrentPassportValid} (reason: ${reason})`) :
            console.log(`finalPassport ${index}: (${finalPassportString}) - valid: ${isCurrentPassportValid}`);
    }

    // console.log(`finalPassports[0]: ${finalPassports[0]}`)
    // console.log(`finalPassports: ${finalPassports}`)
    console.log(`totalValidPassports: ${totalValidPassports}`)
})
