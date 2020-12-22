// 125 < here < 219

var fs = require('fs');
var passports;
var finalPassports = [];
var passportLine = "";
var totalValidPassports = 0;
var dataEntry = "";
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
const dataRules = {
    byr: /:(19[23456789]\d|200[2])/g,
    iyr: /:(20[1]\d|20[2]0)/g,
    eyr: /:(20[2]\d|20[3]0)/g,
    hgt: /:(59|6\d|7[0123456])in|:(1[5678]\d|19[0123])cm/g,
    hcl: /:#([a-f]|[\d]){6}/g,
    ecl: /:(amb|blu|brn|gry|grn|hzl|oth)/g,
    pid: /:(\d){9}/g,
};

fs.readFile('4-data.txt', "utf-8", function (err, data) {
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
        console.log(`finalPassportString: ${finalPassportString}`)

        // check if all passport data types are present
        passportDataTypes.forEach(passportDataType => {
            let matcher = passportDataType;

            if (!finalPassportString.includes(matcher + ":")) {
                isCurrentPassportValid = false;
                reason = passportDataType;
            }
            // console.log(`finalPassportString index ${index} (${finalPassportString}) has passportDataType ${passportDataType}: ${finalPassportString.includes(matcher)}`)
            else {
                // console.log(`search(matcher): ${finalPassportString.search(matcher)}`)
                matcherIndex = finalPassportString.search(matcher);
                finalMatcherIndex = matcherIndex + 3;
                // console.log(`finalMatcherIndex: ${finalMatcherIndex}`)

                switch (passportDataType) {
                    case "byr":
                        dataEntry = finalPassportString.substring(finalMatcherIndex, finalMatcherIndex + 5)
                        console.log(`${passportDataType} year: ${dataEntry}`)

                        break;

                    case "iyr":
                        dataEntry = finalPassportString.substring(finalMatcherIndex, finalMatcherIndex + 5)
                        console.log(`${passportDataType} year: ${dataEntry}`)

                        break;

                    case "eyr":
                        dataEntry = finalPassportString.substring(finalMatcherIndex, finalMatcherIndex + 5)
                        console.log(`${passportDataType} year: ${dataEntry}`)

                        break;

                    case "hgt":
                        dataEntry = finalPassportString.substring(finalMatcherIndex, finalMatcherIndex + 6)
                        console.log(`${passportDataType} height: ${dataEntry}`)

                        break;

                    case "hcl":
                        dataEntry = finalPassportString.substring(finalMatcherIndex, finalMatcherIndex + 8)
                        console.log(`${passportDataType} hairColor: ${dataEntry}`)

                        break;

                    case "ecl":
                        dataEntry = finalPassportString.substring(finalMatcherIndex, finalMatcherIndex + 4)
                        console.log(`${passportDataType} eyeColor: ${dataEntry}`)

                        break;

                    case "pid":
                        dataEntry = finalPassportString.substring(finalMatcherIndex, finalMatcherIndex + 10)
                        console.log(`${passportDataType} passportId: ${dataEntry}`)

                        break;

                    default:
                        console.error(`Error on dataRules for (${passportDataType})`);
                        break;
                }
                if (dataEntry.match(dataRules[passportDataType]) == null) {
                    isCurrentPassportValid = false;
                }
                // console.log(`null: ${passportId.match(dataRules[passportDataType])}`)
                // console.log(`valid: ${passportId.match(dataRules[passportDataType]) != null}`)
                console.log(`-----------------------------------------------`)
            }
        });

        if (isCurrentPassportValid) {
            totalValidPassports++;
        }
        reason ?
            console.log(`finalPassport ${index}: (${finalPassportString}) - valid: ${isCurrentPassportValid} (reason: ${reason})`) :
            console.log(`finalPassport ${index}: (${finalPassportString}) - valid: ${isCurrentPassportValid}`);
        console.log(`===========================================`)
    }

    // console.log(`finalPassports[0]: ${finalPassports[0]}`)
    console.log(`totalValidPassports: ${totalValidPassports}`)
})
