const log = console.log;
const request = require("request");
const chalk = require("chalk");

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=839d67baa4bf58b9933de527c2eeb653&query=' + latitude + ',' + longitude + '&units=f';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(chalk.red.inverse("Sorry there seems to be an error"));
    } else if (body.error) {
      callback(chalk.red("Unable to find location you requested"));
    } else {
      const current = body.current.temperature;
      const feelsLike = body.current.feelslike;
      const weatherDescription = body.current.weather_descriptions;
      const windSpeed = body.current.wind_speed;
      const windDirection = body.current.wind_dir;
      const time = body.location.localtime;
      
      callback(undefined, 
        `At ${time} ... The weather conditions are ${weatherDescription}.  ` + `It is currently ${current} degrees out and it feels like ${feelsLike} degrees.  ` +   
        ` The wind is ${windSpeed} mph coming from the ${windDirection}`

      );
    }
  });
};


module.exports = forecast