const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (let item of passTimes) {
    console.log(`Next pass at ${new Date(item.risetime)} for ${item.duration} seconds!`);
  }
  // success, print out the deets!
});



