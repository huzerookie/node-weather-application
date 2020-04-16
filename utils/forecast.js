const request = require('request')



//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const foreCast = (longitude,latitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/b8b12292c8243dff862d09cdbfa48ce8/'+latitude+','+longitude+'?lang=en&units=si'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Error connecting to Weather server(No Wifi)",undefined)
        }
        else if(response.body.code==400){
            callback("Error fetching data from Weather server(Bad Url)",undefined)
        }
        else{
            const data = response.body
            callback(undefined,data.daily.data[0].summary+" Currently temperature is "
            +data.currently.temperature+" and there is "+data.currently.precipProbability+"% chances of rain")
            //callback(undefined, data)
            
        }
    })
}


module.exports={
    foreCast:foreCast
}