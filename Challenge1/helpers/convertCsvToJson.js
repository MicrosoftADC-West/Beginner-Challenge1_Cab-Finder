exports.getJson = filePath => {
  const csvToJson = require("convert-csv-to-json");

  const json = csvToJson.getJsonFromCsv(filePath);

  const result = [];

  for (i = 0; i < json.length; i += 1) {
    const keysArr = Object.keys(json[i])[0].split(",");
    const valuesArr = Object.values(json[i])[0].split(",");

    currObj = {};
    for (j = 0; j < keysArr.length; j += 1) {
      currObj[keysArr[j]] = valuesArr[j];
    }

    result.push(currObj);
  }

  return result;
};
