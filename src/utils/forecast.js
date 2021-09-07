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

          "It is currently " +
            body.current.weather_descriptions[0] +
            " with a temperature of " +
            body.current.temperature +
            " °C, which feels like " +
            body.current.feelslike +
            " °C, with a precipitation of " +
            body.current.precip +
            ", humidity " +
            body.current.humidity +
            "% and pressure at " +
            (body.current.pressure / 1000).toFixed(2) +
            " atm." +
            " This information was last updated at " +
            body.current.observation_time
        );
      }
    }
  );
};

module.exports = forecast;
