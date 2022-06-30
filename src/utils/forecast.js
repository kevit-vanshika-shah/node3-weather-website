const request = require("request");
const axios = require("axios");
// const forecast = (latitude, longitude, callback) => {
//   // const url =
//   //   "http://api.weatherstack.com/current?access_key=59a43c14af5ed13f5400851341df6eb8&query=" +
//   //   latitude +
//   //   "," +
//   //   longitude +
//   //   "&units=f";

// const url =
//   "http://api.weatherstack.com/current?access_key=e1a2f59bb33e3100c992b6981613691c&query=" +
//   latitude +
//   "," +
//   longitude +
//   "&units=f";

//   request({ url, json: true }, (error, { body }) => {
//     if (error) {
//       callback("Unable to connect to weather services", undefined);
//     } else if (body.error) {
//       callback("Unable to find location.", undefined);
//     } else {
// callback(
//   undefined,
//   `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.
//   The humidity is ${body.current.humidity} %.`
// );
//     }
//   });
// };

async function forecast(latitude, longitude, callback) {
  const url = `http://api.weatherstack.com/current?access_key=e1a2f59bb33e3100c992b6981613691c&query=${latitude},${longitude}&units=f`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    // console.log(data);
    if (data.error) {
      return callback("Unable to find location.", undefined);
    } else {
      callback(
        undefined,
        `${data.current.weather_descriptions[0]} It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees out.
        The humidity is ${data.current.humidity} %.`
      );
    }
  } catch (error) {
    callback("Unable to connect to weather services", undefined);
  }
}

module.exports = forecast;
