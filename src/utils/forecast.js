const request = require('request')

const forecast = (longitude, latitude, callback) => {

    const url = 'https://api.darksky.net/forecast/db0ef5e27213c23fe6f3ac42fa51ba0d/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    const proxy = 'http://proxy-lmi.global.lmco.com'
    
    request({proxy, url, strictSSL: false, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            const {temperature, precipProbability} = body.currently
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + temperature + ' degrees out.  There is a ' + precipProbability + '% change of rain' )
        }  
    })

}

module.exports = forecast
