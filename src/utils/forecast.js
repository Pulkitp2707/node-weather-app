const request = require('request')

const forecast = (latitude, longitude, location, callback) =>{
    const url = 'https://api.darksky.net/forecast/3b161d2e09b01e27005716666cda0b8e/'+latitude+','+longitude+'?units=si'
        request({url : url , json:true} , (error,response)=>{
            if(error){
                callback('Unable to connect to weather services',undefined)
            }
            else if(response.body.error){
                callback('Invalid location',undefined)
            }
            else{
                const rain =  response.body.currently.precipIntensity
                const temp = response.body.currently.temperature 
                callback(undefined,response.body.hourly.summary+" The temperature in "+location+" is "+ temp + " degrees out.There is "+ rain +"% chance of rain")
            }
})
}

module.exports = forecast