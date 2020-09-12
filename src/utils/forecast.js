const request = require('request')

forecast = (latitude, longitude , callback) => {
     const url = 'http://api.weatherstack.com/current?access_key=37a070b5b97940a82f00c52fec830396&query='+latitude+','+longitude
     request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find the location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+' throughout the day. It is currently'
            + body.current.temperature+' degrees out.' +'It feels like '+ body.current.feelslike)
        }
     })
}

module.exports = forecast