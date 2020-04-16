const request = require('request')
const fs = require('fs')
const geoCode = (address, callback)=>{
    const mapBoxUrl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic3BhcnJvdzMyIiwiYSI6ImNrN2hzaGM5cjBjbzIzaG54YTk0ajM3bncifQ.6k7fE_hFn41MZDfYfxU4Ww&limit=1"
    request({url:mapBoxUrl, json:true},(error ,response)=>{
        if(error){
            callback("Error connecting to server", undefined)
        }
        else if(!response.body.features || response.body.features.length==0){
            callback("Error fetching data from server",undefined)
        }
        else{
            const data = response.body.features[0]
            callback(undefined, {
                location:data.place_name,
                longitude:data.geometry.coordinates[0],
                latitude:data.geometry.coordinates[1]
            })
           
        }


    })



}

geoCode('Bhindi Bazaar',(error,response)=>{
   if(error) 
        return console.log(error)
    //console.log(response)
    const forecast = require('./forecast.js')
    forecast.foreCast(response.longitude,response.latitude,(foreCastError, foreCastResponse)=>{
        if(foreCastError) 
        return console.log(foreCastError)
    
    })
})

module.exports={
    geoCode:geoCode
}
