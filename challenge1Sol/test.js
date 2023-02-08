const SkillChallenge = require("./helperMethods");

// Initialize the class
const challenge = new SkillChallenge();

console.log("\n=====================================");
console.log("Prints the ride price for ride 1");
console.log("=====================================");

const data = challenge.calculateRidePrices();
console.log(data[0]); //Remove the index to print all the rides e.g console.log(data[0]);

console.log("\n=====================================");
console.log("Prints the best price for ride 1");
console.log("=====================================");

console.log(challenge.getBestPrice()["rideWithId_1"]); //Remove the index to print all the rides. e.g console.log(challenge.getBestPrice()["rideWithId_1"]);
