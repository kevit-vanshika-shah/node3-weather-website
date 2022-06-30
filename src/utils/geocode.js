const request = require("request");
const axios = require("axios");

// const geocode = (address, callback) => {
//   const url =
//     "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
//     encodeURIComponent(address) +
//     ".json?types=address&access_token=pk.eyJ1IjoidmFuc2hpa2FzaGFoIiwiYSI6ImNsNHA5Y3R3MzBmOGQzb3F6MTc2a2Rya2wifQ.IGTcSI7jp6numJIudBpAkA&limit=1";

//   request({ url, json: true }, (error, { body }) => {
//     if (error) {
//       callback("Unable to connect to location services", undefined);
//     } else if (body.features.length === 0) {
//       callback("Unable to find location. Try another search.", undefined);
//     } else {
//       callback(undefined, {
//         latitude: body.features[0].center[1],
//         longitude: body.features[0].center[0],
//         location: body.features[0].place_name,x
//       });
//     }
//   });
// };

async function geocode(address, callback) {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/encodeURIComponent(${address}).json?types=address&access_token=pk.eyJ1IjoidmFuc2hpa2FzaGFoIiwiYSI6ImNsNHA5Y3R3MzBmOGQzb3F6MTc2a2Rya2wifQ.IGTcSI7jp6numJIudBpAkA&limit=1`;

    const response = await axios.get(url);
    const data = response.data;
    //console.log(data.features[0]);
    if (data.features.length === 0) {
      return callback(
        "Unable to find location. Try another search.",
        undefined
      );
    }
    callback(undefined, {
      latitude: data.features[0].center[1],
      longitude: data.features[0].center[0],
      location: data.features[0].place_name,
    });
  } catch (error) {
    callback("Unable to connect to location services", undefined);
  }
}

module.exports = geocode;
