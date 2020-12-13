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
        var policyLetterRegex = new RegExp(policyLetter, "g");
        var policyMinimum = +policy.split("-")[0];
        console.log(`policy minimum: ${policyMinimum}`);
        var policyMaximum = +policy.split("-")[1].match(/^\d+/);
        console.log(`policy maximum: ${policyMaximum}`);

        var count = password.match(policyLetterRegex) ?
            password.match(policyLetterRegex).length
            : 0;
        console.log(`count: ${count}`);
        console.log(`NEXT: =============================================`);
        if (count >= policyMinimum && count <= policyMaximum) {
            total++;
        }
    }

    console.log(`total: ${total}`);
});