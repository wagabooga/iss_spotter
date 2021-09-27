const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised');

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const passTimes = JSON.parse(data).response;
    for (let item of passTimes) {
      console.log(`Next pass at ${new Date(item.risetime)} for ${item.duration} seconds!`);
    }
  })
  .catch((error) => {
    console.log("there was an error:", error);
  });