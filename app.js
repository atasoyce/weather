const express = require('express');
const hbs = require('hbs');
const router = require('./router');


let app = express();

app.set('view engine', 'hbs');
app.use(express.static("style"));


app.get('/', router.start);

app.get('/error', router.error);

app.get('/showWeather', router.finalResult);


app.listen(80, () => {
    console.log("Server started.");
});


