const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=71344ec78886adc33ebbc9150aaaabe0&query=" +
    longitude +
    "," +
    latitude +
    "&units=f";

  request(
    {
      url,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect weather service", undefined);
      } else if (body.error) {
        callback("Unable to find location", undefined);
      } else {
        const data = body;
        callback(
          undefined,
          body.current.weather_descriptions[0] +
            ". It is currently " +
            body.current.temperature +
            " fahrenheit out. It feels like " +
            body.current.feelslike +
            " fahrenheit out"
        );
      }
    }
  );
};

module.exports = forecast;
