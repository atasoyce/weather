const darkskyKey = "8afe57755752bb8bf2f99f682b03bf70";

const needle = require('needle');

let dataOfWeather = {
    name: ' ',
    summary: ' ',
    temperature: 0.0,
    apparentTemperature: 0.0
};

let getWeatherAtGps = (dataOfGeocode) => {
    return new Promise( (resolve,reject) => {
        let dataGeocode = dataOfGeocode;
        let url = "https://api.darksky.net/forecast/" + darkskyKey + "/" + dataGeocode.lat + "," + dataGeocode.lon + "?units=si&lang=de";

        needle.get(url, (error, result) => {

            dataOfWeather.summary = result.body.currently.summary;
            dataOfWeather.temperature = result.body.currently.temperature;
            dataOfWeather.apparentTemperature = result.body.currently.apparentTemperature;
            dataOfWeather.name = dataGeocode.name;

            if (error) {
                reject('Error:002 - needle Error in weather:' + error);
            } else {
                if (dataOfWeather.summary !== null || dataOfWeather.temperature !== null || dataOfWeather.apparentTemperature !== null){
                    resolve(dataOfWeather);
                } else {
                    reject('Error:004 - Daten ungültig in weather');
                }
            }
        });
    });
};

exports.getWeatherAtGps = getWeatherAtGps;