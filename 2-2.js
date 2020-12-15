var fs = require('fs');
var total = 0;
fs.readFile('2-data.txt', "utf-8", function (err, data) {
    if (err) throw err;
    var array = data.toString().split("+");
    for (let index = 0; index < array.length; index++) {
        array[index] = array[index].replace(/['\s]/g, "");
        console.log(`entry ${index}: ${array[index]}`);
        var entry = array[index].split(":");
        var policy = entry[0];
        console.log(`policy: ${policy}`);
        var password = entry[1];
        console.log(`password: ${password}`);
        var policyLetter = policy.match(/[a-z]/);
        console.log(`policy letter: ${policyLetter}`);
        // var policyLetterRegex = new RegExp(policyLetter, "g");
        var policyFirstPosition = +policy.split("-")[0];
        console.log(`policy first position: ${policyFirstPosition}`);
        var policySecondPosition = +policy.split("-")[1].match(/^\d+/);
        console.log(`policy second position: ${policySecondPosition}`);

        var policyFirstCharacter = password.charAt(policyFirstPosition - 1);
        console.log(`policy first character: ${policyFirstCharacter}`);
        var policySecondCharacter = password.charAt(policySecondPosition - 1);
        console.log(`policy second character: ${policySecondCharacter}`);

        console.log(`NEXT: =============================================`);
        console.log(`policyLetter == policyFirstCharacter: ${policyLetter == policyFirstCharacter}`);
        console.log(`policyLetter != policySecondCharacter: ${policyLetter == policySecondCharacter}`);
        console.log(`policyLetter != policyFirstCharacter: ${policyLetter == policyFirstCharacter}`);
        console.log(`policyLetter == policySecondCharacter: ${policyLetter == policySecondCharacter}`);
        if (policyLetter == policyFirstCharacter && policyLetter != policySecondCharacter ||
            policyLetter != policyFirstCharacter && policyLetter == policySecondCharacter) {
            total++;
            console.log(`===VALID: %c${password}`, "color:red;");
            console.log(`===VALID: %c${policyFirstCharacter}`, "color:red;");
            console.log(`===VALID: %c${policySecondCharacter}`, "color:red;");
        }
    }

    // console.log(`charAt: ${password.charAt(policyFirstPosition)}`);
    // console.log(`charAt: ${password.charAt(policySecondPosition)}`);
    // console.log(`policy match first: ${policyLetter === password.charAt(policyFirstPosition)}`);
    // console.log(`policy match second: ${policyLetter === password.charAt(policySecondPosition)}`);

    console.log(`total: ${total}`);
});