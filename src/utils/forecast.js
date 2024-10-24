const request = require("request")

const forecast = (lat, long, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=f4f723c9a4bb1028af559ab900df7c2c&units=imperial"
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback("Unable to connect to weather service!", undefined)
        } else if (body.cod == 400){
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, body.weather[0].description.charAt(0).toUpperCase() + body.weather[0].description.substring(1) + ". It is currently " + body.main.temp 
             + " degrees out. It feels like " + body.main.feels_like 
             + " degrees out. The humidity is " + body.main.humidity + "%.")
        }
    })
}

module.exports = forecast