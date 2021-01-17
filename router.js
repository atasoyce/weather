
const geocode = require('./geocode');
const weather = require('./weather');

function start(req, res) {
    res.render('start');
}

function error(req, res){
    res.render('error');
}

let finalResult = (request, response) => {
    let myEnteredString = request.query.myaddress;

    let result = geocode.getGpsFromAddress(myEnteredString).then(weather.getWeatherAtGps).then(dataOfWeather => {
        response.render('weatherPage.hbs', dataOfWeather);
        console.log(dataOfWeather)
    }).catch( () => {
        response.render('error.hbs');
    });
};

exports.start = start;
exports.error = error;
exports.finalResult = finalResult;



