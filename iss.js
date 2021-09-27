const request  = require('request');

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    // console.log('It worked! Returned IP:' , ip);
  
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      // console.log('It worked! Returned coords:' , coords);
  
      fetchISSFlyOverTimes(coords, (error, issFlyOverTimes) => {
        if (error) {
          console.log("It didn't work!", error);
          return;
        }
        // console.log('It worked! Returned issFlyOverTimes:' , issFlyOverTimes);
        callback(null, issFlyOverTimes);
      });
    });
  });
};
const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, function(error, response, body) {
    // request failed
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null, data.ip);
    return;
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    let totalCoords = {latitude: data.latitude, longitude: data.longitude};
    callback(null, totalCoords);
    return;
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    callback(null, data.response);
    return;
  });
};
module.exports = {nextISSTimesForMyLocation};

