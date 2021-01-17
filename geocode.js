const apiKey = "35aabbf502c77a";

const needle = require('needle');

let dataOfGeocode = {
    name: ' ',
    lat: 0.0,
    lon: 0.0
};


let getGpsFromAddress = (myaddress) => {
    return new Promise( (resolve,reject) => {
        let encodedAddress = encodeURI(myaddress);
        let url = "https://eu1.locationiq.com/v1/search.php?key=" + apiKey + "&q=" + encodedAddress + "&format=json&accept-language=de";

        needle.get(url, (error, result) => {

            dataOfGeocode.name = result.body[0].display_name;
            dataOfGeocode.lat = result.body[0].lat;
            dataOfGeocode.lon = result.body[0].lon;

            if (error) {
                reject('Error:001 - needle-Error in geocode:' + error);
            }
            else{
                if (dataOfGeocode.name != null || dataOfGeocode.lat != null){
                    resolve(dataOfGeocode);
                } else {
                    reject('Error:003 - Daten ungültig in geocode');
                }
            }
        });
    });
};

exports.getGpsFromAddress = getGpsFromAddress;