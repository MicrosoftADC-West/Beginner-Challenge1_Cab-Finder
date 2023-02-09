const fs = require('fs');

function convertCsvToJson(fileName) {
    const csv = fs.readFileSync(fileName).toString('utf8');
    const csvToArray = csv.split('\n');
    const header = csvToArray[0].split(',');

    const result = [];

    for (let i = 1; i < csvToArray.length; i++) {
        const currObj = {}

        if (csvToArray[i] == undefined || csvToArray[i].trim() == '')
            continue;

        const currArr = csvToArray[i].split(',');

        for (let j = 0; j < header.length; j++) {
            currObj[header[j].trim()] = currArr[j].trim();
        }

        result.push(currObj);
    }

    return result;
};

module.exports = convertCsvToJson